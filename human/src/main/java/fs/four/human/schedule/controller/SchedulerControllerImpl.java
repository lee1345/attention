package fs.four.human.schedule.controller;

import fs.four.human.schedule.controller.ScheduleController;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/schedule")
public class SchedulerControllerImpl implements ScheduleController{
    @GetMapping
    public ModelAndView schedule(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("-----schedule-----");
        return new ModelAndView("schedule/schedule");
    }
}
