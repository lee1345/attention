package fs.four.human.common.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.web.servlet.ModelAndView;

public interface CommonController {

    public ModelAndView common(HttpSession session) throws Exception;
}
