package ee.mihkel.veebipood;

import ee.mihkel.veebipood.controller.ProductController;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class VeebipoodApplication {

	public static void main(String[] args) {
		SpringApplication.run(VeebipoodApplication.class, args);
	}

    // 1. 05.01 - Spring algus (Controller, Repository, Entity).
    // 2. 07.01 - Exception. Order. Person. Address
    // 3. 12.01 - DTO, kokkuarvutus. Rendipood + 1 unit test veebipoes
    // 4. 14.01 - frontend
    // 5. 19.01 - Unit testid rendipoes. frontendis lisamine
    // 6. 21.01 - frontendis ühe toote vaatamine, muutmine, ostukorv


}
