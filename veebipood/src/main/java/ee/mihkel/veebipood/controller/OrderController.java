package ee.mihkel.veebipood.controller;

import ee.mihkel.veebipood.dto.OrderProductDto;
import ee.mihkel.veebipood.entity.Order;
import ee.mihkel.veebipood.model.OrderPaid;
import ee.mihkel.veebipood.model.ParcelMachine;
import ee.mihkel.veebipood.model.PaymentLink;
import ee.mihkel.veebipood.repository.OrderRepository;
import ee.mihkel.veebipood.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
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

    @GetMapping("my-orders")
    public List<Order> myOrders() {
        Long personId = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
        return orderRepository.findAllByPersonId(personId);
    }

    @PostMapping("orders")
    public PaymentLink save(@RequestParam String parcelMachine, @RequestBody List<OrderProductDto> orderProducts) {
        Long personId = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
        Order order = orderService.save(personId, orderProducts, parcelMachine);
        // miks salvestan enne ja siis maksan?
        // 1. mul on vaja makses ID-d ja ID tekib andmebaasist kui salvestan
        // 2. kui juhtub tehniline error (raha läheb maha), aga meie leheni ei tule ehk
        //          ei salvesta, siis enne salvestades pole hullu
        return orderService.pay(order.getId(), order.getTotal());
    }

    @GetMapping("check-payment")
    public OrderPaid checkPayment(@RequestParam String orderReference, String paymentReference) {
        return orderService.checkPayment(orderReference, paymentReference);
    }

    @GetMapping("parcelmachines")
    public List<ParcelMachine> getParcelMachines(@RequestParam String country) {
        return orderService.getParcelMachines(country);
    }
}
