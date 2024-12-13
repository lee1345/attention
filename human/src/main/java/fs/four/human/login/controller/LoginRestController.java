package fs.four.human.login.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import fs.four.human.login.service.LoginRestService;
import fs.four.human.login.service.LoginService;
import fs.four.human.login.vo.LoginVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

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
    public ResponseEntity<String> login(@RequestParam String e_id, @RequestParam String e_pwd, HttpSession session) {
        try {
            boolean isValid = loginRestService.validateLogin(e_id, e_pwd);
            if (isValid) {
                session.setAttribute("loginUserID",e_id);
                return ResponseEntity.ok("로그인 성공");
            } else {
                return ResponseEntity.status(401).body("아이디 또는 비밀번호가 잘못되었습니다.");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("서버 오류로 인해 로그인에 실패했습니다.");
        }
    }

    // 아이디 중복 체크
    @GetMapping("/idCheck")
    public ResponseEntity<String> checkId(@RequestParam String e_id) {
        if (e_id == null || e_id.isEmpty()) {
            return ResponseEntity.status(400).body("아이디를 입력해 주세요.");
        }
        try {
            boolean IdAvailable = loginRestService.checkId(e_id);
            if (IdAvailable) {
                return ResponseEntity.ok("사용 가능한 아이디입니다.");
            } else {
                return ResponseEntity.status(409).body("이미 사용 중인 아이디입니다.");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("아이디 중복 확인 실패");
        }
    }

    @PostMapping("/find-id")
    public ResponseEntity<?> findId(@RequestParam String e_name, @RequestParam String e_email) {
        try {
            String foundId = loginRestService.findId(e_name, e_email);
            if (foundId != null) {
                Map<String, String> response = new HashMap<>();
                response.put("e_id", foundId);
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.status(404).body("일치하는 사용자가 없습니다.");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("서버 오류가 발생했습니다.");
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestParam String e_id, @RequestParam String e_email) {
        try {
            String tempPassword = loginRestService.resetPassword(e_id, e_email);
            if (tempPassword != null) {
                //성공 메세지 보여줌
                return ResponseEntity.ok("임시 비밀번호가 이메일로 전송되었습니다");
            } else {
                return ResponseEntity.status(404).body("일치하는 사용자가 없습니다.");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("비밀번호 초기화 중 오류가 발생했습니다.");
        }
    }
}
