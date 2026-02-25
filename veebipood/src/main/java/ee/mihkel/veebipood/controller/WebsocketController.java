package ee.mihkel.veebipood.controller;

import ee.mihkel.veebipood.dto.OrderProductDto;
import ee.mihkel.veebipood.entity.Product;
import ee.mihkel.veebipood.model.websocket.Greeting;
import ee.mihkel.veebipood.model.websocket.HelloMessage;
import ee.mihkel.veebipood.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.HtmlUtils;

import java.util.List;

@RestController
public class WebsocketController {

    @Autowired
    private ProductRepository productRepository;

    @MessageMapping("/hello")
    @SendTo("/topic/greetings")
    public Greeting greeting(HelloMessage message) throws Exception {
        Thread.sleep(1000); // simulated delay
        return new Greeting("Hello, " + HtmlUtils.htmlEscape(message.getName()) + "!");
    }

    @MessageMapping("/stock")
    @SendTo("/topic/products")
    public List<Product> updateProductsStock() {
        return productRepository.findAll();
    }

}
