package fs.four.human.alarm.batch;

import fs.four.human.mytodo.service.MytodoService;
import fs.four.human.mytodo.vo.MytodoVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Component
public class TaskBatch {
    @Autowired
    private MytodoService mytodoService;

    @Scheduled(fixedRate = 60000) // 1분마다 실행
    public void fetchTodoData() {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String now = formatter.format(new Date());
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.MINUTE, 30);
        String thirtyMinutesLater = formatter.format(calendar.getTime());

        System.out.println("**** 일정조회중 ****");
        System.out.println("Start Time: " + now);
        System.out.println("End Time: " + thirtyMinutesLater);

        List<MytodoVO> tasks = mytodoService.getTasksForNotification();
        if (tasks.isEmpty()) {
            System.out.println("시간범위에 해당하는 일정이 없음");
        } else {
            tasks.forEach(task -> {
                System.out.println("Task ID: " + task.getT_id());
                System.out.println("Title: " + task.getT_title());
                System.out.println("Start Date: " + task.getT_start_date());
            });
        }
    }
}