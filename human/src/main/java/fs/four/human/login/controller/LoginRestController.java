package fs.four.human.login.controller;

import fs.four.human.login.service.LoginRestService;
import fs.four.human.login.vo.LoginVO;
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

    @PostMapping("/log_in")
    public ResponseEntity<String> login(@RequestBody LoginVO loginVO) {
        try {
            boolean isValid = loginRestService.validateLogin(loginVO);
            if (isValid) {
                return ResponseEntity.ok("로그인 성공");
            } else {
                return ResponseEntity.status(401).body("아이디 또는 비밀번호가 잘못되었습니다.");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("서버 오류로 인해 로그인에 실패했습니다.");
        }
    }
}
