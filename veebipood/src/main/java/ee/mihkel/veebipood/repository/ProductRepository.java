package ee.mihkel.veebipood.repository;

import ee.mihkel.veebipood.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product,Long> {


    List<Product> findByCategory_Id(Long id);

    List<Product> findByActiveTrue();

    List<Product> findByActiveTrueAndCategory_Id(Long id);


}
