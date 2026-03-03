package ee.mihkel.veebipood.controller;

import ee.mihkel.veebipood.entity.Product;
import ee.mihkel.veebipood.repository.ProductRepository;
import ee.mihkel.veebipood.service.CacheService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CacheService cacheService;

    // localhost:8080/hi
//    @GetMapping("hi")
//    public String hello(){
//        return "Hello World";
//    }

    // localhost:8080/products?categoryId=1
    @GetMapping("products")   // pageable --> annab automaatselt ?page=0&size=10&sort=price,asc
    public Page<Product> getProducts(@RequestParam(required = false) Long categoryId, Pageable pageable) {
        if (categoryId == null) {
            return productRepository.findByActiveTrue(pageable);
        } else {
            return productRepository.findByActiveTrueAndCategory_Id(categoryId, pageable);
        }
    }

    @GetMapping("products/admin")
    public List<Product> getAdminProducts(){
        return productRepository.findByOrderById();
    }

    @PostMapping("products")
    public Product addProduct(@RequestBody Product product){
        if (product.getId() != null) {
            throw new RuntimeException("Cannot add product with id");
        }
        return productRepository.save(product);
    }

    // localhost:8080/products?id=2
//    @DeleteMapping("products")
//    public List<Product> deleteProduct(@RequestParam Long id){
//        productRepository.deleteById(id);
//        return productRepository.findAll();
//    }

    // RequestParam --> 2 või rohkem URLi muutujat või 1 ja nullable

    @DeleteMapping("products/{id}")
    public List<Product> deleteProduct(@PathVariable Long id) throws ExecutionException {
        productRepository.deleteById(id);
        cacheService.deleteProduct(id);
        return productRepository.findAll();
    }

    @GetMapping("products/{id}")
    public Product getProduct(@PathVariable Long id) throws ExecutionException {
        //return productRepository.findById(id).orElseThrow(()->new RuntimeException("Product not found"));
        return cacheService.getProduct(id);
    }

    @PutMapping("products")
    public Product editProduct(@RequestBody Product product) throws ExecutionException {
        if (product.getId() == null) {
            throw new RuntimeException("Cannot edit product without id");
        }
        cacheService.updateProduct(product);
        return productRepository.save(product);
    }
}
