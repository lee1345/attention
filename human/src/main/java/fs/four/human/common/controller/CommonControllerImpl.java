package fs.four.human.common.controller;

import fs.four.human.common.service.CommonService;
import fs.four.human.common.vo.CommonVO;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

// 컨트롤러 클래스 정의
@Controller
@RequestMapping("/common") // 이 컨트롤러의 모든 요청은 "/common" 경로를 기본으로 사용
public class CommonControllerImpl implements CommonController {

    @Autowired
    private CommonService commonService;

    @GetMapping
    public ModelAndView common(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("-----common-----");
        return new ModelAndView("common/common");
    }

//    @PostMapping("/login")
//    public ModelAndView login(String e_id, HttpSession session) {
//
//        // CommonService를 호출하여 e_id로 사용자 정보를 가져옴
//        CommonVO employee = commonService.getEmployeeInfo(e_id);
//
//        // 사용자 정보가 존재하면 (로그인 성공)
//        if (employee != null) {
//            session.setAttribute("loginUserID", e_id); // 세션에 사용자 정보를 저장
//            return new ModelAndView("redirect:/common/common"); // 성공 시 메인 화면으로 리다이렉트 ( 이거 정해야함 )
//        } else { // 사용자 정보가 없으면 (로그인 실패)
//            ModelAndView mav = new ModelAndView("login/login"); // 로그인 페이지로 이동
//            mav.addObject("error", "Invalid ID or password"); // 에러 메시지를 뷰로 전달
//            return mav;
//        }
//    }
}
