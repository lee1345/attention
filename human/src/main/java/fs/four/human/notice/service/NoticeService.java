package fs.four.human.notice.service;

import fs.four.human.freeBoard.vo.FreeBoardVO;
import fs.four.human.notice.dao.NoticeDAO;
import fs.four.human.notice.vo.NoticeVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    // 게시글 수정
    public void updateNotice(NoticeVO notice) {
        noticeDAO.updateNotice(notice);
    }

    // 게시글 삭제
    public void deleteNotice(int id) {
        noticeDAO.deleteNotice(id);
    }

    // 더블클릭 정렬
    public List<NoticeVO> sortNotices(String column, String order) {
        if (!isValidColumn(column) || !isValidOrder(order)) {
            throw new IllegalArgumentException("잘못된 정렬 요청입니다.");
        }

        Map<String, String> params = new HashMap<>();
        params.put("column", column);
        params.put("order", order);

        return noticeDAO.sortNotices(params);
    }

    private boolean isValidColumn(String column) {
        List<String> validColumns = Arrays.asList("B_ID", "B_TITLE", "B_CONTENT", "B_WRITER", "B_CREATEDDATE", "B_VIEWCOUNT");
        return validColumns.contains(column);
    }

    private boolean isValidOrder(String order) {
        return "ASC".equalsIgnoreCase(order) || "DESC".equalsIgnoreCase(order);
    }


}
