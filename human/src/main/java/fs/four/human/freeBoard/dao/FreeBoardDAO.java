package fs.four.human.freeBoard.dao;

import fs.four.human.freeBoard.vo.FreeBoardVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface FreeBoardDAO {

    // 전체 게시판 조회
    List<FreeBoardVO> getAllFreeBoard();

    // 필터와 검색어 기반 검색
    List<FreeBoardVO> searchFreeBoard(
            @Param("category") String category,
            @Param("query") String query);
}
