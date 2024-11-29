package fs.four.human.common.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

public interface CommonController {

    @GetMapping("/common.do")
    ModelAndView common(HttpSession session) throws Exception;

    public ModelAndView common(HttpServletRequest reqeust, HttpServletResponse response) throws Exception;
}
