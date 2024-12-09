package fs.four.human.notice.dao;

import fs.four.human.notice.vo.NoticeVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

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
    @Select("SELECT * FROM board WHERE b_Id = #{id}")
    NoticeVO getNoticeById(int id);
}
