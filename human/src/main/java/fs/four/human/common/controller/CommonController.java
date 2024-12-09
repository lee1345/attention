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

    @GetMapping
    public ModelAndView common() {
        return new ModelAndView("common/common");
    }
}
