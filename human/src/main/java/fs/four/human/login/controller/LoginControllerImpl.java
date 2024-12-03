package fs.four.human.login.controller;

import fs.four.human.login.controller.LoginController;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/login")
public class LoginControllerImpl implements LoginController {

        @GetMapping
        public ModelAndView login(HttpServletRequest request, HttpServletResponse response) {
            System.out.println("-----login-----");
            return new ModelAndView("login/login");
        }

}
