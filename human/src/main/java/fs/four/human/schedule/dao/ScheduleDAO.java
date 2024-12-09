package fs.four.human.schedule.dao;

import java.util.List;
import fs.four.human.schedule.vo.ScheduleVO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ScheduleDAO {
    //일정 불러오기
    List<ScheduleVO> getSchedules();
}

