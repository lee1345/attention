package fs.four.human.common.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/common")
public class CommonControllerImpl implements CommonController {
    @GetMapping
    public ModelAndView common(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("-----common--------");
        return new ModelAndView("common/common");
    }
    // 주소록 페이지 이동
    @GetMapping("/addressBook")
    public ModelAndView addressBookPage() {
        return new ModelAndView("addressBook/addressBook"); // "WEB-INF/views/addressBook/addressBook.jsp"
    }
}
