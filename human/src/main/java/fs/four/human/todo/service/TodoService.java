package fs.four.human.todo.service;

import fs.four.human.common.dao.CommonDAO;
import fs.four.human.common.vo.CommonVO;
import fs.four.human.todo.dao.TodoDAO;
import fs.four.human.todo.vo.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TodoService {
    @Autowired
    private TodoDAO todoDAO;
    @Autowired
    private CommonDAO commonDAO;

    // 전체 게시물 데이터 조회  비즈니스 로직
    public List<Todo2VO> getAllTodo(TodoVO todoVO) {
        return todoDAO.getAllTodo(todoVO);
    }

    public List<TodoStageCountVO> getTodoStageCount(String dept){
        System.out.println("Dept: " + dept); // 로그 출력
        return todoDAO.getTodoStageCount(dept);
    }

    public List<TodoStageCountVO> getTodoPriorityCount(String dept){
        System.out.println("Dept: " + dept); // 로그 출력
        return todoDAO.getTodoStageCount(dept);
    }
    public int addTodo(Todo2VO todoVO) {
        todoDAO.addTodo(todoVO);
        System.out.println("시퀀스값 :" + todoVO.getT_id());

        // detail에 추가
        List<String> participants = todoVO.getParticipants();
        TodoDetailVO todoDetailVO = mapParticipantsToVO(participants);
        todoDetailVO.setTd_id(Long.parseLong(todoVO.getT_id()));
        System.out.println(todoDetailVO);
        todoDAO.addTodoDetail(todoDetailVO);
        return 1;
    }

    public int addTodoDetail(TodoDetailVO todoDetailVO) {
        return todoDAO.addTodoDetail(todoDetailVO);
    }

    public TodoDetailVO mapParticipantsToVO(List<String> participants) {
        TodoDetailVO vo = new TodoDetailVO();

        // Ensure participants list has exactly 5 elements
        for (int i = 0; i < 5; i++) {
            String participant = (i < participants.size()) ? participants.get(i) : null;

            switch (i) {
                case 0:
                    vo.setTd_participant_1(participant);
                    break;
                case 1:
                    vo.setTd_participant_2(participant);
                    break;
                case 2:
                    vo.setTd_participant_3(participant);
                    break;
                case 3:
                    vo.setTd_participant_4(participant);
                    break;
                case 4:
                    vo.setTd_participant_5(participant);
                    break;
            }
        }

        return vo;
    }
    public int updateTodo(TodoVO todoVO) {
        return todoDAO.updateTodo(todoVO);
    }

    public int updateTodo2(Todo2VO todoVO) {
        return todoDAO.updateTodo2(todoVO);
    }

    public CommonVO getEmployeeById(String e_id) {
        CommonVO employee = commonDAO.getEmployeeById(e_id);
        return employee;
    }
}
