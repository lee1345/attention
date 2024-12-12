package fs.four.human.mytodo.controller;

import fs.four.human.common.service.CommonService;
import fs.four.human.mytodo.service.MytodoService;
import fs.four.human.mytodo.vo.MytodoVO;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    //할일 조회
    @GetMapping("/list")
    public ResponseEntity<List<MytodoVO>> getMyTodos(HttpSession session) {
        String userId = (String) session.getAttribute("loginUserID");
        if (userId == null) {
            return ResponseEntity.status(401).build(); // 로그인되지 않은 경우
        }

        List<MytodoVO> todos = mytodoService.getMyTodos("M", userId); // "M"은 나의 할일 그룹
        return ResponseEntity.ok(todos);
    }

    //버튼으로 상태 변경
    @PostMapping("/updateStage")
    public ResponseEntity<String> updateStage(
            @RequestParam("t_id") Long t_id,
            @RequestParam("t_stage") String t_stage) {
        try {
            mytodoService.updateStage(t_id, t_stage);
            return ResponseEntity.ok("상태 업데이트 성공");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("상태 업데이트 실패");
        }
    }

    //할일 삭제
    @DeleteMapping("/deleteTodo")
    public ResponseEntity<?> deleteTodoById(@RequestParam("t_id") Long t_id) {
        try {
            System.out.println("삭제 요청된 t_id: " + t_id); // 디버깅용
            mytodoService.deleteTodoById(t_id);
            return ResponseEntity.ok("삭제 완료");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("삭제 실패: " + e.getMessage());
        }
    }

    //정렬기능
    @GetMapping("/sort")
    public ResponseEntity<List<MytodoVO>> sortTodos(
            @RequestParam("sortType") String sortType,
            HttpSession session) {
        String userId = (String) session.getAttribute("loginUserID");
        if (userId == null) {
            return ResponseEntity.status(401).build(); // 로그인되지 않은 경우
        }

        // 정렬된 할일 목록 가져오기
        List<MytodoVO> sortedTodos = mytodoService.getSortedTodos("M", userId, sortType);
        return ResponseEntity.ok(sortedTodos);
    }


}