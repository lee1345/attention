package fs.four.human.alarm.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

import java.time.LocalDateTime;
import java.time.LocalTime;

@Configuration
@EnableScheduling
public class BatchSchedulerConfig {
    @Scheduled(fixedRate=60000)
    public void logCurrentTime(){
        System.out.println("배치잡 1분씩 잘 돌고있음, 현재시각 : "+ LocalDateTime.now());
    }
}
