package fs.four.human.common.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.servlet.ModelAndView;

public interface CommonController {

    public ModelAndView common(HttpServletRequest reqeust, HttpServletResponse response) throws Exception;
}
