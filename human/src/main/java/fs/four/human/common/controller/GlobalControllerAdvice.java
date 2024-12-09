package fs.four.human.common.controller;

import fs.four.human.common.service.CommonService;
import fs.four.human.common.vo.CommonVO;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ModelAttribute;

@ControllerAdvice
public class GlobalControllerAdvice {

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
}
