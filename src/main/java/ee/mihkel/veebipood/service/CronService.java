package ee.mihkel.veebipood.service;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;

@Service
public class CronService {

    // * - sekundid 0-59
    // * * - minutid 0-59
    // * * * - tunnid 0-23
    // * * * * - kuupäev 1-31
    // * * * * * - kuu 1-12
    // * * * * * * - nädalapäev 0-7, kus nii 0 kui ka 7 on pühapäev

//    @Scheduled(cron = "0 0 17 * * 1-5")
//    public void runAt1700onWorkDays(){
//        System.out.println("Cron Service is running after every second");
//    }
//
//    @Scheduled(cron = "*/2 37 10 * * *")
//    public void runAfterTwoSeconds(){
//        System.out.println("Cron Service is running after every second");
//    }
//
//    // 8-20
//    @Scheduled(cron = "0 0 8-20 * * 0-5")
//    public void runEveryHourAtWorkDays(){
//        // Repository sees: List<Booking> findByCreatedBetween(Date createdStart, Date createdEnd);
//        // bookingRepository.findByCreatedBetween(HOMME 24h pärast, HOMME 25h pärast);
//        // saada neile SMS / EMAIL, et booking on tulemas
//    }

    // kustuta kõik maksmata tellimused
    // kustuta kõik OrderRow'd mis on sidumata
    //

    private final RestTemplate restTemplate = new RestTemplate();

    @Scheduled(cron = "0 */10 * * * *")
    public void callUrlEveryTenMinutes() {
        String url = "https://back-end-01-2026.onrender.com/products";
        restTemplate.getForObject(url, String.class);
        System.out.println(LocalDateTime.now() + " - Called " + url + " -> OK");
    }



}
