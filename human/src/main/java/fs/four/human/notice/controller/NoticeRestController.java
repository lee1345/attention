package fs.four.human.notice.controller;


import fs.four.human.notice.service.NoticeService;
import fs.four.human.notice.vo.NoticeVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/notice")
public class NoticeRestController {

    @Autowired
    private NoticeService noticeService;

    // 전체 주소 데이터 반환 ( JSON )
    @GetMapping
    public List<NoticeVO> getAllNotice() {
        try {
            return noticeService.getAllNotice();
        } catch (Exception e) {
            throw new RuntimeException("공지사항 데이터를 가져오는 중 오류가 발생했습니다.");
        }
    }

    // 검색 결과 반환 ( JSON )
    @GetMapping("/search")
    public List<NoticeVO> searchNotice(
            @RequestParam("category") String category,
            @RequestParam("query") String query) {

        try {
            System.out.println("검색 필터 category: " + category);
            System.out.println("검색어 query: " + query);

            return noticeService.searchNotice(category, query);

        } catch (Exception e) {
            throw new RuntimeException("검색 중 오류가 발생했습니다.");
        }
    }

}
