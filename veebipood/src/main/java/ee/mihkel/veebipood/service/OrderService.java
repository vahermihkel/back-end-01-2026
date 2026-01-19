package ee.mihkel.veebipood.service;

import ee.mihkel.veebipood.dto.OrderProductDto;
import ee.mihkel.veebipood.entity.Order;
import ee.mihkel.veebipood.entity.Person;
import ee.mihkel.veebipood.entity.Product;
import ee.mihkel.veebipood.repository.OrderRepository;
import ee.mihkel.veebipood.repository.PersonRepository;
import ee.mihkel.veebipood.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private PersonRepository personRepository;

    @Autowired
    private ProductRepository productRepository;

    public Order save(Long personId, List<OrderProductDto> products) {
        Order order = new Order();
        order.setCreated(new Date());
        Person person = personRepository.findById(personId).orElseThrow();
        order.setPerson(person); // TODO: Võtame autentimise tunnusest
        List<Product> productList = new ArrayList<>();
        double sum = 0;
        for (OrderProductDto product : products) {
            Product dbProduct = productRepository.findById(product.getId()).orElseThrow();
            productList.add(dbProduct);
            sum += dbProduct.getPrice();
        }
        order.setProducts(productList);
        order.setTotal(sum);
        return orderRepository.save(order);
    }

    public double calculateOrderSum(List<Product> products) {
        double sum = 0;
        for (Product product : products) {
            sum += product.getPrice();
        }
        return sum;
    }
}
