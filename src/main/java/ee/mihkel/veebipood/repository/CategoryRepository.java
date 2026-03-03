package ee.mihkel.veebipood.repository;

import ee.mihkel.veebipood.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

// CrudRepository --> kõige vähem funktsioone sees

// PagingAndSortingRepository

// JpaRepository --> kõige rohkem funktsioone sees

public interface CategoryRepository extends JpaRepository<Category,Long> {
}
