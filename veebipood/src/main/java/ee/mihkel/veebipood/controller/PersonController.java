package ee.mihkel.veebipood.controller;

import ee.mihkel.veebipood.dto.PersonPublicDto;
import ee.mihkel.veebipood.dto.PersonSignupDto;
import ee.mihkel.veebipood.entity.Person;
import ee.mihkel.veebipood.entity.Role;
import ee.mihkel.veebipood.repository.PersonRepository;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Log4j2
@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class PersonController {

    @Autowired
    private PersonRepository personRepository;

    ModelMapper mapper = new ModelMapper();

    @GetMapping("persons")
    public List<Person> findPersons() {
        return personRepository.findAll();
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
        person.setRole(Role.CUSTOMER);
        Person dbPerson = personRepository.save(person);
        return mapper.map(dbPerson, PersonSignupDto.class);
    }
}
