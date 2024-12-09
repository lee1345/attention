package fs.four.human.schedule.controller;

import fs.four.human.schedule.service.ScheduleServiceImpl;
import fs.four.human.schedule.vo.ScheduleVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/api/schedule")
public class ScheduleRestController {

    @Autowired
    private ScheduleServiceImpl scheduleService;

    @GetMapping
    public List<ScheduleVO> getSchedules() {
        try {
            List<ScheduleVO> schedules = scheduleService.getSchedules();
            System.out.println("Schedules: " + schedules);
            return schedules;
        }catch(Exception e){
            throw new RuntimeException("컨트롤러 오류:");
        }
    }

}
