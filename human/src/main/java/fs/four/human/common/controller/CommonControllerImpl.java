package fs.four.human.common.controller;

import fs.four.human.common.service.CommonService;
import fs.four.human.common.vo.CommonVO;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@Controller
public class CommonControllerImpl implements CommonController {

    @Autowired
    private CommonService commonService;

    @GetMapping("/common.do")
    @Override
    public ModelAndView common(HttpSession session) throws Exception {
        // 세션에 사용자 정보 저장 (예제 데이터)
        session.setAttribute("userName", "김혜민");
        session.setAttribute("userTeam", "인사팀");

        // Service 호출 및 데이터 가져오기 (필요하면 활용)
        List<CommonVO> commonList = commonService.common();

        // ModelAndView 생성
        ModelAndView mav = new ModelAndView("layout"); // layout.jsp 반환
        mav.addObject("commonList", commonList); // 필요하면 데이터 추가

        return mav;
    }

    @Override
    public ModelAndView common(HttpServletRequest reqeust, HttpServletResponse response) throws Exception {
        return null;
    }
}
