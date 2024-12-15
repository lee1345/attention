package fs.four.human.alarm.batch;

import fs.four.human.alarm.service.AlarmHistoryService;
import fs.four.human.mytodo.service.MytodoService;
import fs.four.human.mytodo.vo.MytodoVO;
import fs.four.human.alarm.vo.AlarmHistoryVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate; // WebSocket 메시지 전송 클래스
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;

@Component
public class TaskBatch {

    @Autowired
    private SimpMessagingTemplate messagingTemplate; // WebSocket 메시지 전송 도구

    @Autowired
    private MytodoService mytodoService;

    @Autowired
    private AlarmHistoryService alarmHistoryService;

    @Scheduled(fixedRate = 60000) // 1분마다 실행
    public void processNotifications() {
        Date now = new Date();
        System.out.println("**** 알림 프로세스 시작 ****");
        System.out.println("<현재 시간> " + now);

        // 개인 업무 조회 (t_group = 'M')
        List<MytodoVO> tasks = mytodoService.getTasksByGroup("M");

        if (tasks.isEmpty()) {
            System.out.println("[알림 예정 없음] 현재 시간 기준 알림 예정 작업이 없습니다.");
        } else {
            System.out.println("<다음 알림 예정 작업>");
            tasks.forEach(task -> {
                long timeDiff = task.getT_start_date().getTime() - now.getTime();
                long minutesLeft = timeDiff / (60 * 1000);
                System.out.println(" - Task ID: " + task.getT_id() +
                        ", 제목: " + task.getT_title() +
                        ", 시작 시간: " + task.getT_start_date() +
                        ", 남은 시간: " + minutesLeft + "분");
            });
        }

        tasks.forEach(task -> processTaskNotification(task, now));

        System.out.println("**** 알림 프로세스 종료 ****");
    }

    private void processTaskNotification(MytodoVO task, Date now) {
        long timeDiff = task.getT_start_date().getTime() - now.getTime();

        if (timeDiff <= 30 * 60 * 1000 && timeDiff > 29 * 60 * 1000) {
            createAndSaveAlarm(task, "[사전알림] " + task.getT_title() + " 30분 전입니다!", "30min", "pending");
        } else if (timeDiff <= 60 * 1000 && timeDiff >= 0) {
            createAndSaveAlarm(task, "[정각알림] " + task.getT_title() + " 정각 알림입니다!", "onTime", "complete");
        }
    }

    private void createAndSaveAlarm(MytodoVO task, String message, String cycle, String status) {
        AlarmHistoryVO alarm = new AlarmHistoryVO();
        alarm.setAl_time(new Date());
        alarm.setAl_t_id(task.getT_id());
        alarm.setAl_cycle(cycle);
        alarm.setAl_status(status);
        alarm.setAl_employee(null); // employee_id를 null로 설정

        alarmHistoryService.saveAlarm(alarm);

        System.out.println("[DB 저장 성공] 알림 메시지: " + alarm.getAl_status());
        sendAlertToClient(message);
    }

    private void sendAlertToClient(String message) {
        // JavaScript 실행을 위한 코드 삽입
        messagingTemplate.convertAndSend("/topic/alerts", message); // 클라이언트로 메시지 전송
        System.out.println("[ALERT] " + message);
    }
}
