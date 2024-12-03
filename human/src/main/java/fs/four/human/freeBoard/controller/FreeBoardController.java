package fs.four.human.freeBoard.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.servlet.ModelAndView;

public interface FreeBoardController {

    public ModelAndView freeBoard(HttpServletRequest reqeust, HttpServletResponse response) throws Exception;
}
