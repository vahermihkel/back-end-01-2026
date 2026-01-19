package ee.mihkel.rendipood.controller;

import ee.mihkel.rendipood.dto.FilmAddDto;
import ee.mihkel.rendipood.entity.Film;
import ee.mihkel.rendipood.entity.FilmType;
import ee.mihkel.rendipood.repository.FilmRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class FilmController {

    @Autowired
    private FilmRepository filmRepository;

    ModelMapper modelMapper = new ModelMapper();

    @PostMapping("add-multiple-films")
    public List<Film> addMultipleFilms(@RequestBody List<FilmAddDto> filmAddDtos){
        List<Film> films = List.of(modelMapper.map(filmAddDtos, Film[].class));
        return filmRepository.saveAll(films);
    }

    @PostMapping("films")
    public Film addFilm(@RequestBody FilmAddDto filmDto){
//        Film film = new Film();
//        film.setTitle(filmDto.getTitle());
//        film.setType(filmDto.getType());
        Film film = modelMapper.map(filmDto, Film.class);
        return filmRepository.save(film);
    }

    @DeleteMapping("films/{id}")
    public List<Film> deleteFilm(@PathVariable Long id){
        filmRepository.deleteById(id);
        return filmRepository.findAll();
    }

    @PatchMapping("change-type")
    public Film changeFilmType(@RequestParam Long id, FilmType newType){
        Film film = filmRepository.findById(id).orElseThrow();
        film.setType(newType);
        return filmRepository.save(film);
    }

    @GetMapping("films")
    public List<Film> getAllFilm(){
        return filmRepository.findAll();
    }

    @GetMapping("available-films")
    public List<Film> getAllAvailableFilm(){
        return filmRepository.findByRentedDays(0);
    }
}
