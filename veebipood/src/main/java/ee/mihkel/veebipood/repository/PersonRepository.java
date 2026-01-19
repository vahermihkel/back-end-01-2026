package ee.mihkel.veebipood.repository;

import ee.mihkel.veebipood.entity.Person;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonRepository extends JpaRepository<Person,Long> {
}
