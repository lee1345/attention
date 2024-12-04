package fs.four.human.notice.service;

import fs.four.human.notice.dao.NoticeDAO;
import fs.four.human.notice.vo.NoticeVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoticeService {

    @Autowired
    private NoticeDAO noticeDAO;

    // 전체 게시물 데이터 조회
    public List<NoticeVO> getAllNotice() {
        return noticeDAO.getAllNotice();
    }

    // 필터와 검색어 기반 검색
    public List<NoticeVO> searchNotice(String category, String query) {
        return noticeDAO.searchNotice(category, query);
    }

}
