package fs.four.human.common.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/common") // 이 컨트롤러의 모든 요청은 "/common" 경로를 기본으로 사용
public class CommonController {

    @GetMapping
    public ModelAndView common() {
        return new ModelAndView("common/common");
    }
}
