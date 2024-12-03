package fs.four.human.common.controller;

// 필요한 클래스 및 인터페이스를 임포트
import fs.four.human.common.service.CommonService; // CommonService 인터페이스를 사용하기 위한 임포트
import fs.four.human.common.vo.CommonVO;           // VO 객체로 사용자 데이터를 다룰 예정
import jakarta.servlet.http.HttpServletRequest;    // HTTP 요청 객체
import jakarta.servlet.http.HttpServletResponse;   // HTTP 응답 객체
import jakarta.servlet.http.HttpSession;           // 세션 객체
import org.springframework.beans.factory.annotation.Autowired; // 의존성 주입에 사용
import org.springframework.stereotype.Controller;  // 컨트롤러 클래스임을 명시
import org.springframework.web.bind.annotation.GetMapping; // GET 요청을 처리
import org.springframework.web.bind.annotation.PostMapping; // POST 요청을 처리
import org.springframework.web.bind.annotation.RequestMapping; // 기본 경로 설정
import org.springframework.web.servlet.ModelAndView; // 뷰와 데이터를 함께 반환하기 위해 사용

// 컨트롤러 클래스 정의
@Controller
@RequestMapping("/common") // 이 컨트롤러의 모든 요청은 "/common" 경로를 기본으로 사용
public class CommonControllerImpl implements CommonController {

    // CommonService 객체를 의존성 주입하여 사용
    @Autowired
    private CommonService commonService;

    /**
     * GET 요청 처리
     * "/common"으로 들어오는 GET 요청을 처리하여 "common/common.jsp" 페이지로 이동
     */
    @GetMapping
    public ModelAndView common(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("-----common-----"); // 디버깅용으로 로그 출력
        return new ModelAndView("common/common"); // 뷰 이름 "common/common" 반환
    }

    /**
     * POST 요청 처리 (로그인 기능)
     * "/common/login"으로 들어오는 POST 요청을 처리하여 사용자 로그인 수행
     * @param e_id: 사용자 ID (로그인 폼에서 전달)
     * @param session: 사용자 세션 객체 (로그인 정보를 저장)
     * @return: 로그인 성공 시 메인 화면으로 리다이렉트, 실패 시 로그인 페이지로 이동
     */
    @PostMapping("/login")
    public ModelAndView login(String e_id, HttpSession session) {
        // CommonService를 호출하여 e_id로 사용자 정보를 가져옴
        CommonVO employee = commonService.getEmployeeInfo(e_id);

        // 사용자 정보가 존재하면 (로그인 성공)
        if (employee != null) {
            session.setAttribute("user", employee); // 세션에 사용자 정보를 저장
            return new ModelAndView("redirect:/common/main"); // 성공 시 메인 화면으로 리다이렉트
        } else { // 사용자 정보가 없으면 (로그인 실패)
            ModelAndView mav = new ModelAndView("common/login"); // 로그인 페이지로 이동
            mav.addObject("error", "Invalid ID or password"); // 에러 메시지를 뷰로 전달
            return mav;
        }
    }
}
