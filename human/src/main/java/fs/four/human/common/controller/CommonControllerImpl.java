package fs.four.human.common.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class CommonControllerImpl {

    @GetMapping("/common")
    public String showCommonPage() {
        System.out.println("Accessing /common"); // 로그 확인
        return "common/common"; // JSP 경로 반환
    }
}
