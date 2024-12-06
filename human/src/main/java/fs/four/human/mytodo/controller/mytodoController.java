package fs.four.human.mytodo.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.servlet.ModelAndView;

public interface mytodoController {

    public ModelAndView mytodo(HttpServletRequest request, HttpServletResponse response) throws Exception;
}
