package fs.four.human.freeBoard.service;

import fs.four.human.freeBoard.dao.FreeBoardDAO;
import fs.four.human.freeBoard.vo.FreeBoardVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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

    // 새로운 주소 데이터 등록
    public void createFreeBoard(FreeBoardVO freeBoard) {
        freeBoardDAO.createFreeBoard(freeBoard);
    }

}
