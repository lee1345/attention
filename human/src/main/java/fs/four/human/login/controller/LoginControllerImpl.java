package fs.four.human.login.controller;

import fs.four.human.login.vo.LoginVO;
import fs.four.human.login.service.LoginService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/login")
public class LoginControllerImpl implements LoginController {

    @Autowired
    private LoginService loginService;


    @GetMapping
    public ModelAndView login(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("-----login-----");
        return new ModelAndView("login/login");
    }

    @PostMapping("/sign_in")
    public String signUp(LoginVO loginVO) {
        loginService.signUp(loginVO);
        return "redirect:/login"; // 로그인 페이지로 리다이렉트
    }
}
