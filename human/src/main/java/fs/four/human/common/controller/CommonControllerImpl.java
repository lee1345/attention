package fs.four.human.common.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class CommonControllerImpl {

    @GetMapping("/common")
    public String showCommonPage(Model model) {
        model.addAttribute("message", "JSP 출력 성공!");
        return "common/common"; // WEB-INF/views/common/common.jsp
    }
}
