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

    // 전체 주소록 데이터 조회
    public List<FreeBoardVO> getAllFreeBoard() {
        return freeBoardDAO.getAllFreeBoard();
    }

    // 필터와 검색어 기반 검색
    public List<FreeBoardVO> searchFreeBoard(String category, String query) {
        return freeBoardDAO.searchFreeBoard(category, query);
    }

//    // 새로운 주소 데이터 등록
//    public FreeBoardVO createFreeBoard(FreeBoardVO freeBoard) {
//        freeBoardDAO.createAddress(FreeBoard);
//        return freeBoard; // 등록된 주소 데이터 반환
//    }
//
//    // 주소 데이터 수정
//    public FreeBoardVO updateFreeBoard(String id, FreeBoardVO freeBoard) {
//        freeBoard.setAdId(id);
//        freeBoardDAO.updateFreeBoard(freeBoard);
//        return freeBoard;
//    }
//
//    // 주소 데이터 삭제
//    public void deleteFreeBoard(String id) {
//        freeBoardDAO.deleteFreeBoard(id);
//    }

}
