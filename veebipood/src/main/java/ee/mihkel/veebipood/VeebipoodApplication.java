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
    // 6. 21.01 - frontendis ühe toote vaatamine, muutmine, ostukorv, pageable
    // 7. 26.01 - kogus ostukorvis (CartProduct, OrderRow). RestTemplate (API päring)
    // 8. 28.01 - pakiautomaadid, online makse (https://support.every-pay.com/), @Autowired
    // 9.T 03.02 - autentimine: SecurityConfig, JwtFilter, JwtService.
    //10.N 05.02 - (salvestusest algus puudu - erinevad keskkonnad)
    // autentimise jätk: isiku saamine tokenist, frontendis tellimused
    //11.E 09.02 - ostukorvi koguse kontroll. ostukorvis: kui pakiautomaat valimata. kui sisselogimata. korralik veateade. võtame ostukorvis tooted backendist päringuga
    //12.K 11.02 - Context: CartSum, Auth. frondis nupud peita. Isik võtta menüüsse.
    //13.E 16.02 - WebSocket
    //14.K 18.02 - Signup. frontend ei saaks backendi päringult parooli + DBs hashimine. frontendi keskkonnad. backis rollid. frondis vastavalt rollile saab midagi teha.
    //15.K 25.02 serveritesse ülespanek
    //16.R 27.02 ---> 12.00-15.15 HANS
    //17.T 03.03 CRON. cachemine. emaili saatmine. andmebaasis automaatselt kes muutis ja millal muutis.
    //18.T 17.03 - 9.15-10.45
}
