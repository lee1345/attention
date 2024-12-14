package fs.four.human.freeBoard.dao;

import fs.four.human.freeBoard.vo.FreeBoardVO;
import fs.four.human.notice.vo.NoticeVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Mapper
public interface FreeBoardDAO {

    // 전체 게시판 조회
    List<FreeBoardVO> getAllFreeBoard();

    // 필터와 검색어 기반 검색
    List<FreeBoardVO> searchFreeBoard(
            @Param("category") String category,
            @Param("query") String query);
    
    // 카테고리별 조회
    List<FreeBoardVO> getFreeBoardByCategory(@Param("category") String category);

    // 특정 공지사항 조회
    FreeBoardVO getFreeBoardById(int id);

    // 조회수 증가
    void incrementViewCount(@Param("id") int id);

    // 새로운 게시판 데이터 등록
    void createFreeBoard(FreeBoardVO freeBoard);

    // 게시판 데이터 삭제
    void deleteFreeBoard(int id);

    // 게시판 데이터 수정
    void updateFreeBoard(FreeBoardVO freeBoard);

    // 제목클릭 정렬
    List<FreeBoardVO> sortFreeBoard(Map<String, String> params);
}
