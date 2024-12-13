package fs.four.human.todo.dao;

import fs.four.human.todo.vo.Todo2VO;
import fs.four.human.todo.vo.TodoDetailVO;
import fs.four.human.todo.vo.TodoStageCountVO;
import fs.four.human.todo.vo.TodoVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;


@Mapper
public interface TodoDAO {

    // 전체 Todo 조회 반환타입은 TodoVO의 리스트 ->TODO 테이블에서 조회된 여러 개의 TodoVO 객체를 반환
    List<TodoVO> getAllTodo(TodoVO todoVO);

    // 부서별 할 일 조회
    List<TodoVO> getTodosByDept(@Param("dept") String dept);

    // 부서별 할 일 상태 카운트
    List<TodoStageCountVO> getTodoStageCount(@Param("dept") String dept);

    int addTodo(Todo2VO todoVO);
    int addTodoDetail(TodoDetailVO todoDetailVO);

    // Todo 업데이트
    int updateTodo(TodoVO todoVO);


}
