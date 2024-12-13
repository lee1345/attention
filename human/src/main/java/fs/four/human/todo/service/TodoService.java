package fs.four.human.todo.service;

import fs.four.human.todo.dao.TodoDAO;
import fs.four.human.todo.vo.Todo2VO;
import fs.four.human.todo.vo.TodoDetailVO;
import fs.four.human.todo.vo.TodoStageCountVO;
import fs.four.human.todo.vo.TodoVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TodoService {
    @Autowired
    private TodoDAO todoDAO;

    // 전체 할 일 조회
    public List<TodoVO> getAllTodo(TodoVO todoVO) {
        return todoDAO.getAllTodo(todoVO);
    }

    // 전체 게시물 데이터 조회  비즈니스 로직
    public List<TodoVO> getTodosByDept(String dept) {
        return todoDAO.getTodosByDept(dept);
    }


    public List<TodoStageCountVO> getTodoStageCount(String dept){
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
}
