package ee.mihkel.veebipood.controller;

import ee.mihkel.veebipood.model.Supplier1Product;
import ee.mihkel.veebipood.model.Supplier2Product;
import ee.mihkel.veebipood.service.EmailService;
import ee.mihkel.veebipood.service.SupplierService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class SupplierController {

    @Autowired
    private SupplierService supplierService;

    @Autowired
    private EmailService emailService;

    // localhost:8080/supplier1
    @GetMapping("supplier1")
    public List<Supplier1Product> getProductsFromSupplier1() {
        emailService.sendPlainText("vahermihkel@gmail.com", "Tere", "Sisu");
        return supplierService.getProductsFromSupplier1();
    }

    @GetMapping("supplier2")
    public List<Supplier2Product> getProductsFromSupplier2() throws MessagingException {
        emailService.sendHtml("vahermihkel@gmail.com", "Tere", "<h1>Tere</h1><button>Vajuta</button>");
        return supplierService.getProductsFromSupplier2();
    }
}
