package ee.mihkel.veebipood.controller;

import ee.mihkel.veebipood.entity.Category;
import ee.mihkel.veebipood.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CategoryController {

    @Autowired
    private CategoryRepository categoryRepository;

    @GetMapping("categories")
    public List<Category> getCategories(){
        return categoryRepository.findAll();
    }

    @PostMapping("categories")
    public Category addCategory(@RequestBody Category category){
        if (category.getId() != null) {
            throw new RuntimeException("Cannot add category with id");
        }
        return categoryRepository.save(category);
    }

    @DeleteMapping("categories/{id}")
    public List<Category> deleteCategory(@PathVariable Long id){
        categoryRepository.deleteById(id);
        return categoryRepository.findAll();
    }
}
