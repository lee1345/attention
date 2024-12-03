package fs.four.human.todo.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.servlet.ModelAndView;

public interface TodoController {

    public ModelAndView todo(HttpServletRequest request, HttpServletResponse response) throws Exception;
}
