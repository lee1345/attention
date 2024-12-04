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

    public List<NoticeVO> getAllNotice() {
        List<NoticeVO> notice = noticeDAO.getAllNotice();
        return notice;
    }
}
