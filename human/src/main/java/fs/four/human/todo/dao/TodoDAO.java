package fs.four.human.todo.dao;

import fs.four.human.todo.vo.*;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;


@Mapper
public interface TodoDAO {

    // 전체 Todo 조회 반환타입은 TodoVO의 리스트 ->TODO 테이블에서 조회된 여러 개의 TodoVO 객체를 반환
    List<Todo2VO> getAllTodo(TodoVO todoVO);
    List<TodoStageCountVO> getTodoStageCount(String dept);
    List<TodoPriorityCountVO> getTodoPriorityCount(String dept);
    int addTodo(Todo2VO todoVO);
    int addTodoDetail(TodoDetailVO todoDetailVO);

    // Todo 업데이트
    int updateTodo(TodoVO todoVO);

    int updateTodo2(Todo2VO todoVO);

}
