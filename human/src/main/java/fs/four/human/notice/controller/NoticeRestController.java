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
    @PostMapping
    public List<NoticeVO> getAllNotice() {
        try {
            return noticeService.getAllNotice();
        } catch (Exception e) {
            throw new RuntimeException("전체 데이터를 가져오는 중 오류가 발생했습니다.");
        }
    }

    // 검색 결과 반환 (JSON)
    @PostMapping("/search")
    public List<NoticeVO> searchNotice(@RequestBody NoticeVO noticeVO) { // JSON 데이터를 객체로 매핑
        if (noticeVO.getBCategory() == null || noticeVO.getBTitle() == null) {
            throw new RuntimeException("검색 필터와 검색어는 null이 될 수 없습니다!");
        }

        return noticeService.searchNotice(noticeVO.getBCategory(), noticeVO.getBTitle());
    }

}
