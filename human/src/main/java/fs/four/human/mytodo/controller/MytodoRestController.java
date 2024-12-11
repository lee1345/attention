package fs.four.human.mytodo.controller;

import fs.four.human.common.service.CommonService;
import fs.four.human.mytodo.service.MytodoService;
import fs.four.human.mytodo.vo.MytodoVO;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/mytodo")
public class MytodoRestController {

    @Autowired
    private MytodoService mytodoService;

    @Autowired
    private CommonService commonService;

    @PostMapping("/addTodo")
    public ResponseEntity<String> addTodo(@RequestBody MytodoVO mytodoVO, HttpSession session) {
        try {
            // 세션에서 사용자 ID 가져오기
            String userId = (String) session.getAttribute("loginUserID");
            if (userId == null) {
                return ResponseEntity.status(401).body("로그인이 필요합니다.");
            }

            // t_group 기본값 설정
            mytodoVO.setT_group("M");

            // 사용자 ID 및 부서 설정
            mytodoVO.setT_created_id(userId);
            String dept = commonService.getEmployeeInfo(userId).getE_dept(); // 부서 정보 가져오기
            mytodoVO.setT_dept(dept);

            // 서비스 호출
            mytodoService.addTodo(mytodoVO, userId);

            return ResponseEntity.ok("등록 성공");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("등록 실패");
        }
    }

}
