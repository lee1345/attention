package fs.four.human.notice.dao;

import fs.four.human.notice.vo.NoticeVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface NoticeDAO {

    // 전체 게시판 조회
    List<NoticeVO> getAllNotice();

}
