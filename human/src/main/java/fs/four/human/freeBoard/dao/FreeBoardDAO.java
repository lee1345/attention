package fs.four.human.freeBoard.dao;

import fs.four.human.freeBoard.vo.FreeBoardVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface FreeBoardDAO {

    // 전체 주소록 데이터 조회
    List<FreeBoardVO> getAllFreeBoard();

    // 필터와 검색어 기반 검색
    List<FreeBoardVO> searchFreeBoard(
            @Param("category") String category, @Param("query") String query);

//    // 새로운 주소 데이터 등록
//    void createFreeBoard(FreeBoardVO freeBoard);
//
//    // 주소 데이터 수정
//    void updateFreeBoard(FreeBoardVO freeBoard);
//
//    // 주소 데이터 삭제
//    void deleteFreeBoard(String id);

}
