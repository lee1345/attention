package fs.four.human.todo.service;

import fs.four.human.notice.vo.NoticeVO;
import fs.four.human.todo.dao.TodoDAO;
import fs.four.human.todo.vo.TodoStageCountVO;
import fs.four.human.todo.vo.TodoVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class TodoService {
    @Autowired
    private TodoDAO todoDAO;

    // 전체 게시물 데이터 조회  비즈니스 로직
    public List<TodoVO> getAllTodo(TodoVO todoVO) {
        return todoDAO.getAllTodo(todoVO);
    }

    // 진행 상태별 카운트 데이터 조회
    public List<TodoStageCountVO> getTodoStageCount(String dept){
        System.out.println("Dept: " + dept); // 로그 출력
        return todoDAO.getTodoStageCount(dept);
    }

    // 검색 및 정렬된 Todo 데이터 조회
    public List<TodoVO> getFilteredTodoList(TodoVO searchCriteria, String sortField, String sortOrder) {
        Map<String, Object> params = new HashMap<>();
        params.put("type", searchCriteria.getType());
        params.put("search", searchCriteria.getSearch());
        params.put("sortField", sortField);
        params.put("sortOrder", sortOrder);

        return todoDAO.getFilteredTodoList(params);
    }
}
