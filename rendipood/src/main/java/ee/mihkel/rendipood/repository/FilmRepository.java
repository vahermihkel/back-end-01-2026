package ee.mihkel.rendipood.repository;

import ee.mihkel.rendipood.entity.Film;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FilmRepository extends JpaRepository<Film,Long> {


    List<Film> findByRentedDays(int rentedDays);
}
