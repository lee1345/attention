package fs.four.human.common.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
@RequestMapping("/common")
public class CommonControllerImpl implements CommonController {
    @GetMapping
    public ModelAndView common(HttpServletRequest request, HttpServletResponse response) {
        return new ModelAndView("common");
    }
}

