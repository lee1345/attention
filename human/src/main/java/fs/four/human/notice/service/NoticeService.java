package fs.four.human.notice.service;

import fs.four.human.notice.dao.NoticeDAO;
import fs.four.human.notice.vo.NoticeVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoticeService {

    @Autowired
    private NoticeDAO noticeDAO;

    // 공지사항 조회
    public List<NoticeVO> getAllNotice() {
        return noticeDAO.getAllNotice();
    }

    // 검색 조건 기반 공지사항 조회
    public List<NoticeVO> searchNotice(String category, String query) {
        if (category == null || query == null) {
            throw new IllegalArgumentException("카테고리와 검색어는 필수입니다.");
        }
        return noticeDAO.searchNotice(category, query);
    }

    // 공지사항 등록
    public void createNotice(NoticeVO notice) {
        if (notice.getB_Title() == null || notice.getB_Title().trim().isEmpty()) {
            throw new IllegalArgumentException("제목은 필수 입력 항목입니다.");
        }
        noticeDAO.createNotice(notice);
    }

    // 특정 공지사항 조회
    public NoticeVO getNoticeById(int id) {
        return noticeDAO.getNoticeById(id);
    }

    // 조회수 증가
    public void incrementViewCount(int id) {
        noticeDAO.incrementViewCount(id);
    }

}
