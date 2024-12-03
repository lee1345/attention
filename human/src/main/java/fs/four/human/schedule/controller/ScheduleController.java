package fs.four.human.schedule.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.servlet.ModelAndView;

public interface ScheduleController {
    public ModelAndView schedule(HttpServletRequest reqeust, HttpServletResponse response) throws Exception;

}
