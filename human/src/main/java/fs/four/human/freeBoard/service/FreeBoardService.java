package fs.four.human.freeBoard.service;

import fs.four.human.freeBoard.dao.FreeBoardDAO;
import fs.four.human.freeBoard.vo.FreeBoardVO;
import fs.four.human.notice.vo.NoticeVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class FreeBoardService {

    @Autowired
    private FreeBoardDAO freeBoardDAO;

    // 전체 게시물 데이터 조회
    public List<FreeBoardVO> getAllFreeBoard() {
        return freeBoardDAO.getAllFreeBoard();
    }

    // 필터와 검색어 기반 검색
    public List<FreeBoardVO> searchFreeBoard(String category, String query) {
        return freeBoardDAO.searchFreeBoard(category, query);
    }

    public List<FreeBoardVO> getFreeBoardByCategory(String category) {
        return freeBoardDAO.getFreeBoardByCategory(category);
    }

    // 특정 공지사항 조회
    public FreeBoardVO getFreeBoardById(int id) {
        return freeBoardDAO.getFreeBoardById(id);
    }

    // 조회수 증가
    public void incrementViewCount(int id) {
        freeBoardDAO.incrementViewCount(id);
    }

    // 새로운 게시물 데이터 등록
    public void createFreeBoard(FreeBoardVO freeBoard) {
        freeBoardDAO.createFreeBoard(freeBoard);
    }

    // 게시글 수정
    public void updateFreeBoard(FreeBoardVO freeBoard) {
        freeBoardDAO.updateFreeBoard(freeBoard);
    }

    // 게시글 삭제
    public void deleteFreeBoard(int id) {
        freeBoardDAO.deleteFreeBoard(id);
    }

    // 제목클릭 정렬
    public List<FreeBoardVO> sortFreeBoard(String column, String order) {
        if (!isValidColumn(column) || !isValidOrder(order)) {
            throw new IllegalArgumentException("잘못된 정렬 요청입니다.");
        }

        Map<String, String> params = new HashMap<>();
        params.put("column", column);
        params.put("order", order);

        return freeBoardDAO.sortFreeBoard(params);
    }

    private boolean isValidColumn(String column) {
        List<String> validColumns = Arrays.asList("B_ID", "B_TITLE", "B_CONTENT", "B_WRITER", "B_CREATEDDATE", "B_VIEWCOUNT", "B_CATEGORY");
        return validColumns.contains(column);
    }

    private boolean isValidOrder(String order) {
        return "ASC".equalsIgnoreCase(order) || "DESC".equalsIgnoreCase(order);
    }
}
