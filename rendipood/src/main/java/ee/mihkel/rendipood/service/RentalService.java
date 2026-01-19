package ee.mihkel.rendipood.service;

import ee.mihkel.rendipood.dto.RentalFilmDto;
import ee.mihkel.rendipood.entity.Film;
import ee.mihkel.rendipood.entity.Rental;
import ee.mihkel.rendipood.repository.FilmRepository;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RentalService {

    @Autowired
    private FilmRepository filmRepository;

    private final double PREMIUM_PRICE = 4;
    private final double BASIC_PRICE = 3;

    @Getter
    private double bonusPoints = 0;

    public double calculateInitialFee(List<RentalFilmDto> films, Rental rental) {
        List<Film> dbFilms = new ArrayList<>();
        double sum = 0;
        for(RentalFilmDto film : films) {
            Film dbFilm = filmRepository.findById(film.getId()).orElseThrow();
            if(dbFilm.getRentedDays() > 0) {
                throw new RuntimeException("Film has already been rented");
            }
            dbFilm.setRentedDays(film.getRentedDays());
            filmRepository.save(dbFilm);
            sum += determineTypeAndGetPrice(film, dbFilm);
            dbFilms.add(dbFilm);
        }
        rental.setFilms(dbFilms);
        return sum;
    }

    private double determineTypeAndGetPrice(RentalFilmDto film, Film dbFilm) {
        switch (dbFilm.getType()) {
            case NEW -> {
                bonusPoints += 2;
                return PREMIUM_PRICE * film.getRentedDays();
            }
            case REGULAR -> {
                bonusPoints += 1;
                if (film.getRentedDays() <= 3) {
                    return BASIC_PRICE;
                } else {
                    return BASIC_PRICE + BASIC_PRICE * (film.getRentedDays() - 3);
                }
            }
            case OLD -> {
                bonusPoints += 1;
                if (film.getRentedDays() <= 5) {
                    return BASIC_PRICE;
                } else {
                    return BASIC_PRICE + BASIC_PRICE * (film.getRentedDays() - 5);
                }
            }
        }
        return 0;
    }

    public double calculateLateFee(List<RentalFilmDto> films) {
        double sum = 0;
        for (RentalFilmDto filmDto : films) {
            Film dbFilm = filmRepository.findById(filmDto.getId()).orElseThrow();
            if (dbFilm.getRentedDays() < filmDto.getRentedDays()) {
                switch (dbFilm.getType()) {
                    case NEW -> sum += PREMIUM_PRICE * (filmDto.getRentedDays()-dbFilm.getRentedDays());
                    case REGULAR, OLD -> sum += BASIC_PRICE * (filmDto.getRentedDays()-dbFilm.getRentedDays());
                }
            }
            dbFilm.setRentedDays(0);
            filmRepository.save(dbFilm);
        }
        return sum;
    }
}
