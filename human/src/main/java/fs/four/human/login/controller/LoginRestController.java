package fs.four.human.login.controller;

import fs.four.human.login.service.LoginRestService;
import fs.four.human.login.vo.LoginVO;
import fs.four.human.login.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/login")
public class LoginRestController {

    @Autowired
    private LoginRestService loginRestService;

    @PostMapping("/sign_in")
    public ResponseEntity<String> signUp(@RequestBody LoginVO loginVO) {
        try {
            loginRestService.signUp(loginVO);
            return ResponseEntity.ok("회원가입 성공");

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("회원가입 실패");
        }
    }
}