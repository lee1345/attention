package fs.four.human.notice.controller;

import fs.four.human.notice.vo.NoticeVO;
import fs.four.human.notice.service.NoticeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
@RequestMapping("/notice")
public class NoticeController {
    
    @Autowired
    private NoticeService noticeService;
    
    // JSP 페이지 랜더링 ( 전체 데이터 )
    @GetMapping
    public String notice(Model model) {
        try {
            List<NoticeVO> noticeList = noticeService.getAllNotice(); // service에서 데이터 가져오기
            model.addAttribute("noticeList", noticeList); // 모델에 데이터 추가
            System.out.println("-----notice-----");
            return "notice/notice"; // JSP 파일로 전달

        } catch (Exception e) {
            e.printStackTrace();
            model.addAttribute("errorMessage", "공지사항 데이터를 불러오는 중 오류가 발생했습니다.");
            return "error/error";
        }
    }
    // JSP 페이지 렌더링 (검색 데이터)
    @GetMapping("/search")
    public String searchNotice(
            @RequestParam("category") String category,
            @RequestParam("query") String query, Model model) {

        try {
            List<NoticeVO> searchNotice = noticeService.searchNotice(category, query);
            model.addAttribute("NoticeList", searchNotice);

            System.out.println("검색 필터 category: " + category);
            System.out.println("검색어 query: " + query);

            return "Notice/Notice"; // JSP 파일 경로

        } catch (Exception e) {
            e.printStackTrace();
            model.addAttribute("errorMessage", "검색 중 오류가 발생했습니다.");
            return "error/error"; // 에러 JSP 파일 경로
        }
    }
    
}
