package fs.four.human.common.service;

import fs.four.human.common.dao.CommonDAO;
import fs.four.human.common.vo.CommonVO;
import fs.four.human.todo.vo.TodoVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class CommonServiceImpl implements CommonService{

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
    public List<String> getAlertMessages(String sessionId) {
        List<TodoVO> alertTodos = commonDAO.getAlertTodos(sessionId);
        List<String> alertMessages = new ArrayList<>();
        LocalDateTime now = LocalDateTime.now();

        for (TodoVO todo : alertTodos) {
            LocalDateTime startTime = todo.getStartTime();
            String message = null;

            // 30분 전 또는 정각 조건에 따라 메시지 생성
            if (now.isEqual(startTime.minusMinutes(30))) {
                message = String.format("[30분 전 알림] '%s' 할 일이 곧 시작됩니다.", todo.getTitle());
            } else if (now.isEqual(startTime)) {
                message = String.format("[정각 알림] '%s' 할 일이 시작됩니다.", todo.getTitle());
            }

            if (message != null) {
                alertMessages.add(message);
            }
        }

        return alertMessages;
    }

}
