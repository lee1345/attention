package fs.four.human.login.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.servlet.ModelAndView;

public interface LoginController {
    public ModelAndView login(HttpServletRequest reqeust, HttpServletResponse response) throws Exception;

}
