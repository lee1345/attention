package fs.four.human.alarm.service;

import fs.four.human.alarm.dao.AlarmHistoryDAO;
import fs.four.human.alarm.vo.AlarmHistoryVO;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AlarmHistoryService {

    @Autowired
    private AlarmHistoryDAO alarmHistoryDAO;

    @Autowired
    private HttpSession session;

    public String getAlarmStatus(Long taskId, String cycle) {
        return alarmHistoryDAO.getAlarmStatus(taskId, cycle);
    }
    public void saveAlarm(AlarmHistoryVO alarmHistoryVO) {
        alarmHistoryDAO.insertAlarm(alarmHistoryVO);
    }

}
