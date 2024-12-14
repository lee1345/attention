package fs.four.human.login.service;

import fs.four.human.login.dao.LoginDAO;
import fs.four.human.login.vo.LoginVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import java.util.Random;

@Service
public class LoginRestService {

    @Autowired
    private LoginDAO loginDAO;

    @Autowired
    private JavaMailSender mailSender;

    public boolean validateLogin(String e_id, String e_pwd) {
        String storedPassword = loginDAO.loginMatching(e_id);
        return storedPassword != null && storedPassword.equals(e_pwd);
    }

    public boolean checkId(String e_id) {
        String checkId = loginDAO.newIdCheck(e_id);
        return checkId == null;
    }
    public String findId(String e_name, String e_email) {
        return loginDAO.findId(e_name, e_email);
    }

    public String resetPassword(String e_id, String e_email) {
        // 사용자 확인
        String existingEmail = loginDAO.findEmailById(e_id);
        if (existingEmail != null && existingEmail.equals(e_email)) {
            // 임시 비밀번호 생성
            String tempPassword = generateTemporaryPassword();

            // 비밀번호 업데이트
            loginDAO.updatePassword(e_id, tempPassword);

            // 이메일 전송
            sendTemporaryPassword(e_email, tempPassword);


            return tempPassword; // 생성된 임시 비밀번호 반환
        }
        return null; // 사용자가 일치하지 않음
    }

    // 이메일 전송 메서드 추가
    private void sendTemporaryPassword(String email, String tempPassword) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("임시 비밀번호 발급 안내");
        message.setText(
                "안녕하세요,\n\n" +
                        "요청하신 임시 비밀번호는 다음과 같습니다:\n\n" +
                        tempPassword + "\n\n" +
                        "로그인 후 반드시 비밀번호를 변경해주세요.\n\n" +
                        "감사합니다."
        );
        mailSender.send(message);
    }


    // 임시 비밀번호 생성 메서드
    private String generateTemporaryPassword() {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        StringBuilder tempPassword = new StringBuilder();
        Random random = new Random();

        for (int i = 0; i < 8; i++) { // 8자리 비밀번호 생성
            tempPassword.append(characters.charAt(random.nextInt(characters.length())));
        }
        return tempPassword.toString();
    }

}