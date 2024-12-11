package fs.four.human.common.controller;
import fs.four.human.common.service.CommonService;
import fs.four.human.common.vo.CommonVO;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/common") // REST API의 기본 경로 설정
public class CommonRestController {

    @Autowired
    private CommonService commonService;

    @PostMapping("/update")
    public ResponseEntity<String> updateEmployeeInfo(@RequestBody CommonVO employee, HttpSession session) {
        // 세션에서 사용자 ID 가져오기
        String e_id = (String) session.getAttribute("loginUserID");
        if (e_id == null) {
            return ResponseEntity.status(401).body("로그인이 필요합니다.");
        }

        // 사용자 ID 설정
        employee.setE_id(e_id);

        // 정보 업데이트
        boolean isUpdated = commonService.updateEmployeeInfo(employee);
        if (isUpdated) {
            return ResponseEntity.ok("정보가 성공적으로 업데이트되었습니다.");
        } else {
            return ResponseEntity.status(500).body("업데이트 실패");
        }
    }
    //알림
    @GetMapping("/alarms")
    public List<String> getAlarms(HttpSession session) {
        String sessionId = (String) session.getAttribute("sessionId");
        if (sessionId == null) {
            return Collections.emptyList(); // 세션 ID가 없을 경우 빈 리스트 반환
        }
        return commonService.getAlertMessages(sessionId);
    }

}
