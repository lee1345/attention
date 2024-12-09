package fs.four.human.todo.service;

import fs.four.human.notice.vo.NoticeVO;
import fs.four.human.todo.dao.TodoDAO;
import fs.four.human.todo.vo.TodoStageCountVO;
import fs.four.human.todo.vo.TodoVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TodoService {
    @Autowired
    private TodoDAO todoDAO;

    // 전체 게시물 데이터 조회  비즈니스 로직
    public List<TodoVO> getAllTodo(TodoVO todoVO) {
        return todoDAO.getAllTodo(todoVO);
    }

    public List<TodoStageCountVO> getTodoStageCount(String dept){
        System.out.println("Dept: " + dept); // 로그 출력
        return todoDAO.getTodoStageCount(dept);
    }
}
