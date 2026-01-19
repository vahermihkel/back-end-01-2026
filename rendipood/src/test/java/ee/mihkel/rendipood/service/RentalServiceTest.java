package ee.mihkel.rendipood.service;

import ee.mihkel.rendipood.dto.RentalFilmDto;
import ee.mihkel.rendipood.entity.Film;
import ee.mihkel.rendipood.entity.FilmType;
import ee.mihkel.rendipood.entity.Rental;
import ee.mihkel.rendipood.repository.FilmRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
class RentalServiceTest {

    @Mock
    private FilmRepository filmRepository;

    @InjectMocks
    private RentalService rentalService;

    Film dbFilm1 = new Film();
    Film dbFilm2 = new Film();
    Film dbFilm3 = new Film();
    Rental rental = new Rental();
    List<RentalFilmDto> films = new ArrayList<>();


    @BeforeEach
    void setUp() {
        dbFilm1.setType(FilmType.NEW);
        dbFilm2.setType(FilmType.REGULAR);
        dbFilm3.setType(FilmType.OLD);


        films.add(createFilm(11L, 5));
        films.add(createFilm(12L, 5));
    }

    private RentalFilmDto createFilm(long id, int rentedDays) {
        RentalFilmDto filmDto = new RentalFilmDto();
        filmDto.setId(id);
        filmDto.setRentedDays(rentedDays);
        return filmDto;
    }

    @Test
    void throwsExceptionIfFilmAlreadyRented() {
        dbFilm1.setRentedDays(1);
        when(filmRepository.findById(11L)).thenReturn(Optional.of(dbFilm1));

        RuntimeException exception = assertThrows(RuntimeException.class, () -> rentalService.calculateInitialFee(films, rental));
        assertEquals("Film has already been rented", exception.getMessage());
    }

    @Test
    void calculateInitialFee() {
        when(filmRepository.findById(11L)).thenReturn(Optional.of(dbFilm1));
        when(filmRepository.findById(12L)).thenReturn(Optional.of(dbFilm2));

        double sum = rentalService.calculateInitialFee(films, rental);
        assertEquals(29, sum);
    }

    @Test
    void calculateInitialFee_ifOldFilm() {
        List<RentalFilmDto> dtoFilms = new ArrayList<>();
        dtoFilms.add(createFilm(13L, 5));
        when(filmRepository.findById(13L)).thenReturn(Optional.of(dbFilm3));

        double sum = rentalService.calculateInitialFee(dtoFilms, rental);
        assertEquals(3, sum);
    }

    @Test
    void calculateLateFee() {
        dbFilm1.setRentedDays(4);
        when(filmRepository.findById(11L)).thenReturn(Optional.of(dbFilm1));
        dbFilm2.setRentedDays(4);
        when(filmRepository.findById(12L)).thenReturn(Optional.of(dbFilm2));

        double sum = rentalService.calculateLateFee(films);
        assertEquals(7, sum);

    }

    @Test
    void getBonusPoints() {
        double bonusPoints = rentalService.getBonusPoints();
        assertEquals(0, bonusPoints);
    }

//    @Test
//    void calculateSum() {
//        RentalFilmDto film = new RentalFilmDto();
//        film.setRentedDays(5);
//
//        Film dbFilm = new Film();
//        dbFilm.setType(FilmType.NEW);
//
//        double price = rentalService.determineTypeAndGetPrice(film, dbFilm);
//
//        assertEquals(20, price);
//    }
}