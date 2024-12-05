package fs.four.human.login.controller;

import fs.four.human.login.service.LoginRestService;
import fs.four.human.login.service.LoginService;
import fs.four.human.login.vo.LoginVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/login")
public class LoginRestController {

    @Autowired
    private LoginService loginService;

    @Autowired
    private LoginRestService loginRestService;

    //회원가입
    @PostMapping("/signIn")
    public ResponseEntity<String> signUp(@RequestBody LoginVO loginVO) {
        try {
            loginService.signUp(loginVO);
            return ResponseEntity.ok("회원가입 성공");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("회원가입 실패");
        }
    }

    //로그인
    @PostMapping("/logIn")
    public ResponseEntity<String> login(@RequestParam String e_id, @RequestParam String e_pwd) {
        try {
            boolean isValid = loginRestService.validateLogin(e_id, e_pwd);
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

    //아이디 중복확인
    @PostMapping("checkId")
    public ResponseEntity<String> checkId(@RequestParam String e_id) {
        try {
            boolean idAvailable = loginRestService.IdCorrect(e_id);
            return ResponseEntity.ok("확인");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("서버오류");
        }
    } }

