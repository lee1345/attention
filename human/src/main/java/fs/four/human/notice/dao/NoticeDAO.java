package fs.four.human.notice.dao;

import fs.four.human.address.vo.AddressVO;
import fs.four.human.notice.vo.NoticeVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface NoticeDAO {

    // 전체 게시판 조회
    List<NoticeVO> getAllNotice();

    // 필터와 검색어 기반 검색
    List<NoticeVO> searchNotice(
            @Param("category") String category,
            @Param("query") String query);

    // 새로운 주소 데이터 등록
    void createNotice(NoticeVO notice);
}
