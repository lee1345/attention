package fs.four.human.notice.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/notice")
public class NoticeControllerImpl implements NoticeController {
    @GetMapping
    public ModelAndView notice(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("-----notice-----");
        return new ModelAndView("notice/notice");
    }
}

