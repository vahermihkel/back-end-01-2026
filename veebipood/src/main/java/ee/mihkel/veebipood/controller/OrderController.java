package ee.mihkel.veebipood.controller;

import ee.mihkel.veebipood.dto.OrderProductDto;
import ee.mihkel.veebipood.entity.Order;
import ee.mihkel.veebipood.repository.OrderRepository;
import ee.mihkel.veebipood.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderService orderService;

    @GetMapping("orders")
    public List<Order> findAll() {
        return orderRepository.findAll();
    }

    @PostMapping("orders")
    public Order save(@RequestParam Long personId, @RequestBody List<OrderProductDto> products) {
        return orderService.save(personId, products);
    }
}
