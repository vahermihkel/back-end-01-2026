package ee.mihkel.veebipood.controller;

import ee.mihkel.veebipood.entity.Category;
import ee.mihkel.veebipood.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CategoryController {

    @Autowired
    private CategoryRepository categoryRepository;

    // 100 -> informatsiooniline
    // 200 -> OK
    // 201 -> Created
    // 204 -> No content
    // 300 -> suunamine
    // 400 -> üldine viga front-endi poolel
    // 401 -> pole sisselogitud
    // 403 -> pole tokenit
    // 404 -> Not Found
    // 405 -> Vale mapping
    // 500 -> serveri poolne viga

    @GetMapping("categories")
    public ResponseEntity<List<Category>> getCategories(){
        return ResponseEntity.ok().body(categoryRepository.findAll());
    }

    @PostMapping("categories")
    public ResponseEntity<List<Category>> addCategory(@RequestBody Category category){
        if (category.getId() != null) {
            throw new RuntimeException("Cannot add category with id");
        }
        categoryRepository.save(category);
        return ResponseEntity.status(201).body(categoryRepository.findAll());
    }

    @DeleteMapping("categories/{id}")
    public ResponseEntity<List<Category>> deleteCategory(@PathVariable Long id){
        categoryRepository.deleteById(id);
        return ResponseEntity.ok().body(categoryRepository.findAll());
    }
}
