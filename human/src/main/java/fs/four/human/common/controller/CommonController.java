package fs.four.human.common.controller;

import fs.four.human.common.service.CommonService;

import fs.four.human.common.vo.CommonVO;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

// 컨트롤러 클래스 정의
@Controller
@RequestMapping("/common") // 이 컨트롤러의 모든 요청은 "/common" 경로를 기본으로 사용
public class CommonController {

    @Autowired
    private CommonService commonService;

    // 모든 요청 전에 실행되어 공통 데이터를 Model에 추가
    @ModelAttribute("employee")
    public CommonVO addEmployeeToModel(HttpSession session) {
        String e_id = (String) session.getAttribute("loginUserID");
        if (e_id != null) {
            return commonService.getEmployeeInfo(e_id); // 사용자 정보를 조회하여 반환
        }
        return null; // 세션에 로그인 정보가 없으면 null 반환
    }

    @GetMapping
    public ModelAndView common(HttpSession session) {
        String e_id = (String) session.getAttribute("loginUserID"); // 세션에서 ID 가져오기
        if (e_id == null) {
            // 세션에 ID가 없는 경우, 로그인 페이지로 리다이렉트
            return new ModelAndView("redirect:/login");
        }

        return new ModelAndView("common/common"); // "common/common" View로 이동
    }
}
