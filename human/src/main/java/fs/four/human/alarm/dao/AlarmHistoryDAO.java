package fs.four.human.alarm.dao;

import fs.four.human.alarm.vo.AlarmHistoryVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;


@Mapper
public interface AlarmHistoryDAO {
    void insertAlarm(AlarmHistoryVO alarmHistoryVO);

    String getAlarmStatus(
            @Param("taskId") Long taskId,
            @Param("cycle") String cycle);
}