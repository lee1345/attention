package fs.four.human.schedule.service;

import fs.four.human.schedule.dao.ScheduleDAO;
import fs.four.human.schedule.vo.ScheduleVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ScheduleServiceImpl implements ScheduleService {

    @Autowired
    private ScheduleDAO scheduleDAO;

    @Override
    public List<ScheduleVO> getSchedules() {
        return scheduleDAO.getSchedules();
    }
}
