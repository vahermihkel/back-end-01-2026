package ee.mihkel.veebipood.controller;

import ee.mihkel.veebipood.entity.Product;
import ee.mihkel.veebipood.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    // localhost:8080/hi
//    @GetMapping("hi")
//    public String hello(){
//        return "Hello World";
//    }

    // localhost:8080/products
    @GetMapping("products")
    public List<Product> getProducts(){
        return productRepository.findAll();
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
    public List<Product> deleteProduct(@PathVariable Long id){
        productRepository.deleteById(id);
        return productRepository.findAll();
    }

    @GetMapping("products/{id}")
    public Product getProduct(@PathVariable Long id){
        return productRepository.findById(id).orElseThrow(()->new RuntimeException("Product not found"));
    }

    @PutMapping("products")
    public Product editProduct(@RequestBody Product product){
        if (product.getId() == null) {
            throw new RuntimeException("Cannot edit product without id");
        }
        return productRepository.save(product);
    }
}
