package fs.four.human.notice.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.servlet.ModelAndView;

public interface NoticeController {

    public ModelAndView notice(HttpServletRequest reqeust, HttpServletResponse response) throws Exception;
}
