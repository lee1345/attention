package fs.four.human.notice.controller;

import fs.four.human.notice.service.NoticeService;
import fs.four.human.notice.vo.NoticeVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/notice")
public class NoticeControllerImpl {
    
    @Autowired
    private NoticeService noticeService;
    
    // 기본 주소 페이지 및 주소 데이터 가져오기
    @GetMapping
    public String notice(Model model) {
        System.out.println("-----notice-----");
        
        // service에서 데이터 가져오기
        List<NoticeVO> noticeList = noticeService.getAllNotice();
        
        // 모델에 데이터 추가
        model.addAttribute("noticeList", noticeList);
        
        // JSP 파일로 전달
        return "notice/notice";
    }
}
