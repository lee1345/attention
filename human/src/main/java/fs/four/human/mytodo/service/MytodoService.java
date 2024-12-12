package fs.four.human.mytodo.service;

import fs.four.human.common.service.CommonService;
import fs.four.human.login.vo.LoginVO;
import fs.four.human.mytodo.dao.MytodoDAO;
import fs.four.human.mytodo.vo.MytodoVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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

}


