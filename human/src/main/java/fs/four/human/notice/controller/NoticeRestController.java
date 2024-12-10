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

    // 공지사항 전체 데이터 반환 (JSON)
    @GetMapping
    public List<NoticeVO> getAllNotice() {
        return noticeService.getAllNotice();
    }

    // 검색 결과 반환 (JSON)
    @PostMapping("/search")
    public List<NoticeVO> searchNotice(
            @RequestParam("category") String category,
            @RequestParam("query") String query) {

        // 디버깅 로그
        System.out.println("검색 필터 category: " + category);
        System.out.println("검색어 query: " + query);

        if (category == null || category.isEmpty() || query == null || query.isEmpty()) {
            throw new IllegalArgumentException("검색 필터 또는 검색어가 비어 있습니다.");
        }

        return noticeService.searchNotice(category, query);
    }

    // 공지사항 등록 API
    @PostMapping("/register")
    @ResponseBody
    public String createNotice(@RequestBody NoticeVO notice) {

        if (notice.getB_Content() == null || notice.getB_Content().trim().isEmpty()) {
            throw new IllegalArgumentException("내용은 필수 입력 항목입니다.");
        }

        noticeService.createNotice(notice);
        return "등록 성공!";
    }

    // 특정 공지사항 데이터 반환
    @GetMapping("/{id}")
    public NoticeVO getNoticeById(@PathVariable("id") int id) {
        NoticeVO notice = noticeService.getNoticeById(id);
        if (notice == null) {
            throw new IllegalArgumentException("해당 공지사항을 찾을 수 없습니다.");
        }
        return notice;
    }
}
