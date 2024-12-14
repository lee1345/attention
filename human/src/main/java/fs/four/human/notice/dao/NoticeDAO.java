package fs.four.human.notice.dao;

import fs.four.human.notice.vo.NoticeVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Mapper
public interface NoticeDAO {

    // 공지사항 전체 조회
    List<NoticeVO> getAllNotice();

    // 검색 조건 기반 조회
    List<NoticeVO> searchNotice(
            @Param("category") String category,
            @Param("query") String query);

    // 공지사항 등록
    void createNotice(NoticeVO notice);

    // 특정 공지사항 조회
    NoticeVO getNoticeById(int id);

    // 조회수 증가
    void incrementViewCount(@Param("id") int id);

    // 게시판 데이터 삭제
    void deleteNotice(int id);

    // 게시판 데이터 수정
    void updateNotice(NoticeVO notice);

    // 더블클릭 정렬
    List<NoticeVO> sortNotices(Map<String, String> params);

}
