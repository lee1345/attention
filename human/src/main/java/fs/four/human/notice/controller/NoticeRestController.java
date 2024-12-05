package fs.four.human.notice.controller;

import fs.four.human.notice.service.NoticeService;
import fs.four.human.notice.vo.NoticeVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notice")
public class NoticeRestController {

    @Autowired
    private NoticeService noticeService;

    // 전체 데이터 반환 (JSON)
    @GetMapping
    public List<NoticeVO> getAllNotice() {
        try {
            return noticeService.getAllNotice();
        } catch (Exception e) {
            throw new RuntimeException("전체 데이터를 가져오는 중 오류가 발생했습니다.");
        }
    }

    // 검색 결과 반환 (JSON)
    @PostMapping("/search")
    public List<NoticeVO> searchNotice(
            @RequestParam("category") String category,
            @RequestParam("query") String query) {
        if (category == null || query == null || category.isEmpty() || query.isEmpty()) {
            throw new IllegalArgumentException("카테고리와 검색어는 반드시 필요합니다.");
        }
        return noticeService.searchNotice(category, query);
    }
}
