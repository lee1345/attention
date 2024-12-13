package fs.four.human.common.service;

import fs.four.human.common.dao.CommonDAO;
import fs.four.human.common.vo.CommonVO;
import fs.four.human.todo.vo.TodoVO;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class CommonServiceImpl implements CommonService {

    @Autowired
    private CommonDAO commonDAO;

    // 직위 및 부서 매핑 테이블
    private static final Map<String, String> POSITION_MAP = Map.of(
            "C", "대표",
            "SM", "수석",
            "M", "매니저",
            "SA", "선임",
            "JA", "사원"
    );

    private static final Map<String, String> DEPT_MAP = Map.of(
            "M", "경영",
            "H", "인사",
            "F", "재무",
            "S", "영업마케팅"
    );

    @Override
    public CommonVO getEmployeeInfo(String e_id) {
        CommonVO employee = commonDAO.getEmployeeById(e_id);
        if (employee != null) {
            // 매핑된 직위 및 부서 값 설정
            employee.setE_position(POSITION_MAP.get(employee.getE_position()));
            employee.setE_dept(DEPT_MAP.get(employee.getE_dept()));
        }
        return employee;
    }

    @Override
    public boolean updateEmployeeInfo(CommonVO employee) {
        return commonDAO.updateEmployee(employee) > 0; // 업데이트 성공 여부 반환
    }

    //알림
    @Override
    public List<Map<String, String>> getAlertMessages(String sessionId) {
        List<TodoVO> alertTodos = commonDAO.getAlertTodos(sessionId);
        List<Map<String, String>> alertMessages = new ArrayList<>();
        LocalDateTime now = LocalDateTime.now();

        // 시간 형식 지정
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

        for (TodoVO todo : alertTodos) {
            LocalDateTime startTime = todo.getT_start_date();
            Map<String, String> alert = new HashMap<>();

            // 남은 시간 계산
            long minutesLeft = Duration.between(now, startTime).toMinutes();
            if (minutesLeft > 0) {
                alert.put("time", startTime.format(formatter));
                alert.put("message", String.format("'%s' 할 일이 %d분 남았습니다.", todo.getT_title(), minutesLeft));
            } else if (minutesLeft <= 0) {
                alert.put("time", startTime.format(formatter));
                alert.put("message", String.format("'%s' 할 일이 시작되었습니다.", todo.getT_title()));
            }

            alertMessages.add(alert);
        }

        return alertMessages;
    }


}
