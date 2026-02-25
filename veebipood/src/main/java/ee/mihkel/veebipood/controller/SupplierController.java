package ee.mihkel.veebipood.controller;

import ee.mihkel.veebipood.model.Supplier1Product;
import ee.mihkel.veebipood.model.Supplier2Product;
import ee.mihkel.veebipood.service.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class SupplierController {

    @Autowired
    private SupplierService supplierService;

    // localhost:8080/supplier1
    @GetMapping("supplier1")
    public List<Supplier1Product> getProductsFromSupplier1() {
        return supplierService.getProductsFromSupplier1();
    }

    @GetMapping("supplier2")
    public List<Supplier2Product> getProductsFromSupplier2() {
        return supplierService.getProductsFromSupplier2();
    }
}
