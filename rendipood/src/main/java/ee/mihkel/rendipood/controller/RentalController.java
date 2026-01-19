package ee.mihkel.rendipood.controller;

import ee.mihkel.rendipood.dto.RentalFilmDto;
import ee.mihkel.rendipood.entity.Film;
import ee.mihkel.rendipood.entity.Rental;
import ee.mihkel.rendipood.repository.FilmRepository;
import ee.mihkel.rendipood.repository.RentalRepository;
import ee.mihkel.rendipood.service.RentalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class RentalController {

    @Autowired
    private RentalRepository rentalRepository;

    @Autowired
    private RentalService rentalService;

    @PostMapping("start-rental")
    public double startRental(@RequestBody List<RentalFilmDto> films) {
        Rental rental = new Rental();
        double initialFee = rentalService.calculateInitialFee(films, rental);
        rental.setInitialFee(initialFee);
        rental.setLateFee(0);
        rentalRepository.save(rental);
        return initialFee;
    }

    @PostMapping("end-rental")
    public double endRental(@RequestBody List<RentalFilmDto> films) {
        return rentalService.calculateLateFee(films);
    }

    @GetMapping("bonus-points")
    public double getBonusPoints() {
        return rentalService.getBonusPoints();
    }

}
