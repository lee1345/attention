package fs.four.human.freeBoard.controller;

import fs.four.human.notice.controller.NoticeController;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/freeBoard")
public class FreeBoardControllerImpl implements FreeBoardController {
    @GetMapping
    public ModelAndView freeBoard(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("-----freeBoard-----");
        return new ModelAndView("freeBoard/freeBoard");
    }
}

