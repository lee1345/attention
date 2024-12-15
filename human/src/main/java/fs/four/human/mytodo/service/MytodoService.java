package fs.four.human.mytodo.service;

import fs.four.human.common.service.CommonService;
import fs.four.human.login.vo.LoginVO;
import fs.four.human.mytodo.dao.MytodoDAO;
import fs.four.human.mytodo.vo.MytodoVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.List;
import java.util.Map;

@Service
public class MytodoService {

    @Autowired
    private MytodoDAO mytodoDAO;

    @Autowired
    private CommonService commonService;

    public void addTodo(MytodoVO mytodoVO, String userId) {
        // 부서 정보 조회 및 설정
        String dept = commonService.getEmployeeInfo(userId).getE_dept();
        mytodoVO.setT_dept(dept);

        // 할일 등록
        mytodoDAO.insertTodo(mytodoVO);
    }

    // 할일 조회 메서드
    public List<MytodoVO> getMyTodos(String t_group, String t_created_id) {
        return mytodoDAO.getMyTodos(t_group, t_created_id);
    }
    // 상태별 집계 데이터 반환 메서드
    public Map<String, Integer> getTodoStats(String group, String userId) {
        return mytodoDAO.getTodoStats(group, userId);
    }

    //버튼으로 상태변경
    public void updateStage(Long t_id, String t_stage) {
        mytodoDAO.updateStage(t_id, t_stage);
    }

    //할일 삭제
    public void deleteTodoById(Long t_id){
        mytodoDAO.deleteTodoById(t_id);
    }
    //정렬
    public List<MytodoVO> getSortedTodos(String t_group, String t_created_id, String sortType) {
        return mytodoDAO.getSortedTodos(t_group, t_created_id, sortType);
    }

    //선택 삭제
    public void deleteSelectedTodos(List<Long> ids) {
        mytodoDAO.deleteSelectedTodos(ids);
    }
    // 선택숨기기
    public void updateHideStatus(List<Long> ids, String hideStatus) {
        mytodoDAO.updateHideStatus(ids, hideStatus);
    }
    // 숨기기복귀
    public void updateHideAll() {
        mytodoDAO.updateHideAll();
    }
    // 수정하기
    public void updateTodo(MytodoVO mytodoVO) {
        mytodoDAO.updateTodo(mytodoVO);
    }
    //수정찾기
    public MytodoVO getTodoById(Long t_id) {
        return mytodoDAO.getTodoById(t_id);
    }
    //알림연습
    public List<MytodoVO> getTasksForNotification() {
        // 현재 시간과 30분 뒤 시간 계산
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"); // Oracle 형식
        String now = formatter.format(new Date());
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.MINUTE, 30);
        String thirtyMinutesLater = formatter.format(calendar.getTime());

        return mytodoDAO.getTasksForNotification(now, thirtyMinutesLater);
    }

        public List<MytodoVO> getTasksByGroup(String tGroup) {
            return mytodoDAO.getTasksByGroup(tGroup);
        }



}


