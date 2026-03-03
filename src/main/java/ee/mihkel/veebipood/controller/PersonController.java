package ee.mihkel.veebipood.controller;

import ee.mihkel.veebipood.dto.PersonDto;
import ee.mihkel.veebipood.dto.PersonLoginDto;
import ee.mihkel.veebipood.dto.PersonPublicDto;
import ee.mihkel.veebipood.dto.PersonSignupDto;
import ee.mihkel.veebipood.entity.Person;
import ee.mihkel.veebipood.entity.Role;
import ee.mihkel.veebipood.model.AuthToken;
import ee.mihkel.veebipood.repository.PersonRepository;
import ee.mihkel.veebipood.service.JwtService;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Log4j2
@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class PersonController {

    @Autowired
    private PersonRepository personRepository;

    @Autowired
    ModelMapper mapper;

    @Autowired
    private JwtService jwtService;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    @GetMapping("persons")
    public List<PersonDto> findPersons() {
        return List.of(mapper.map(personRepository.findAll(), PersonDto[].class));
    }

    @GetMapping("persons/public")
    public List<PersonPublicDto> findAll() {
//        List<Person> persons = personRepository.findAll();
//        List<PersonPublicDto> personsDto = new ArrayList<>();
//        for (Person person : persons) {
//            PersonPublicDto personDto = new PersonPublicDto();
//            personDto.setFirstName(person.getFirstName());
//            personDto.setLastName(person.getLastName());
//            personsDto.add(personDto);
//        }
//        return personsDto;
        log.info(mapper);
        System.out.println("TERE");
        return List.of(mapper.map(personRepository.findAll(), PersonPublicDto[].class));
    }

    @PostMapping("signup")
    public PersonSignupDto save(@RequestBody Person person) {
        log.error(mapper);
        System.out.println("PersonController" + new Date());
//        person.setRole(Role.CUSTOMER); ---> LIVEs tagasi
        person.setPassword(encoder.encode(person.getPassword()));
        Person dbPerson = personRepository.save(person);
        return mapper.map(dbPerson, PersonSignupDto.class);
    }

    @PostMapping("login")
    public AuthToken login(@RequestBody PersonLoginDto  personLoginDto) {
        Person dbPerson = personRepository.findByEmail(personLoginDto.email());
        // pärisrakendustes eelistatakse, et ei anna vihjet kas viga on emailis või paroolis
        if (dbPerson == null) {
            throw new RuntimeException("Invalid email");
        }
        // $2a$10$Qd8.fBBfhv8QZ.ko8IKJeemjN8Al5T0UyG50a6fgHWEL2iF1aGt2m
        // $2a$10$ATRBLI2SIICPIB7BCMNYceWM1x/xIBXhgRWAC0Ih6Y7X9X3o8/U3y
        if (!encoder.matches(personLoginDto.password(), dbPerson.getPassword())) {
            throw new RuntimeException("Invalid password");
        }
        return jwtService.generateToken(dbPerson);
    }

    @GetMapping("profile")
    public PersonDto getProfile() {
        Long personId = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
        Person dbPerson = personRepository.findById(personId).orElseThrow();
        return mapper.map(dbPerson, PersonDto.class);
    }

    @PutMapping("update-profile")
    public PersonDto updateProfile(@RequestBody Person person) {
        Person dbPerson =  personRepository.save(person);
        return mapper.map(dbPerson, PersonDto.class);
    }
}
