package fs.four.human.notice.controller;

import fs.four.human.freeBoard.vo.FreeBoardVO;
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
    public List<NoticeVO> searchFreeBoard(
            @RequestParam("category") String category,
            @RequestParam("query") String query) {

        try {
            // 디버깅 로그
            System.out.println("검색 필터 category: " + category);
            System.out.println("검색어 query: " + query);

            // 검색 조건 검증
            if (category == null || category.isEmpty() || query == null || query.isEmpty()) {
                throw new IllegalArgumentException("검색 필터 또는 검색어가 비어 있습니다.");
            }

            // 검색 결과 반환
            return noticeService.searchNotice(category, query);

        } catch (IllegalArgumentException e) {
            e.printStackTrace();
            throw e; // 클라이언트에 예외 전달

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("검색 중 문제가 발생했습니다.");
        }
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
        // 조회수 증가 로직 추가
        noticeService.incrementViewCount(id); // 조회수 증가

        // 공지사항 데이터 반환
        NoticeVO notice = noticeService.getNoticeById(id);
        // 디버깅 로그로 데이터 확인
        System.out.println("공지사항 데이터: " + notice);

        if (notice == null) {
            throw new IllegalArgumentException("해당 공지사항을 찾을 수 없습니다.");
        }
        return notice;
    }

    //==========================================================================

    // 게시판 수정
    @PutMapping("/{id}")
    public String updateNotice(@PathVariable("id") int id, @RequestBody NoticeVO notice) {
        NoticeVO existingNotice = noticeService.getNoticeById(id);

        if (existingNotice == null) {
            return "해당 게시글이 존재하지 않습니다.";
        }

        if (!existingNotice.getB_Writer().equals(notice.getB_Writer())) {
            return "수정 권한이 없습니다.";
        }

        noticeService.updateNotice(notice);
        return "수정 성공!";
    }

    // 게시판 삭제
    @DeleteMapping("/{id}")
    public String deleteNotice(@PathVariable("id") int id, @RequestParam("user") String user) {
        NoticeVO notice = noticeService.getNoticeById(id);

        if (user == null || user.isEmpty()) {
            return "삭제 요청에서 사용자 정보가 누락되었습니다.";
        }

        if (notice == null) {
            return "해당 게시글이 존재하지 않습니다.";
        }

        if (!notice.getB_Writer().equals(user)) {
            return "삭제 권한이 없습니다.";
        }

        noticeService.deleteNotice(id);
        return "삭제 성공!";
    }

    // 제목클릭 정렬
    @GetMapping("/sort")
    public List<NoticeVO> sortNotices(@RequestParam String column, @RequestParam String order) {
        return noticeService.sortNotices(column, order);
    }


}
