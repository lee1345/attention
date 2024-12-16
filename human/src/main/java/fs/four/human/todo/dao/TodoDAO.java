package fs.four.human.todo.dao;

import fs.four.human.login.vo.LoginVO;
import fs.four.human.todo.vo.Todo2VO;
import fs.four.human.todo.vo.TodoDetailVO;
import fs.four.human.todo.vo.TodoStageCountVO;
import fs.four.human.todo.vo.TodoVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;


@Mapper
public interface TodoDAO {

    // 전체 Todo 조회 반환타입은 TodoVO의 리스트 ->TODO 테이블에서 조회된 여러 개의 TodoVO 객체를 반환
    List<Todo2VO> getAllTodo(TodoVO todoVO);
    List<TodoStageCountVO> getTodoStageCount(String dept);
    List<TodoStageCountVO> getMyTodoStageCount(String loginName);
    int addTodo(Todo2VO todoVO);
    int addTodoDetail(TodoDetailVO todoDetailVO);

    // Todo 업데이트
    int updateTodo(TodoVO todoVO);

    int updateTodo2(Todo2VO todoVO);

    List<LoginVO> getDeptEmployeeByDept(String dept);

    int updateTodoDetail(TodoDetailVO todoDetailVO);
}
