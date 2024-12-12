package fs.four.human.todo.dao;

import fs.four.human.notice.vo.NoticeVO;
import fs.four.human.todo.vo.TodoStageCountVO;
import fs.four.human.todo.vo.TodoVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;


@Mapper
public interface TodoDAO {

    // 전체 Todo 조회 반환타입은 TodoVO의 리스트 ->TODO 테이블에서 조회된 여러 개의 TodoVO 객체를 반환
    List<TodoVO> getAllTodo(TodoVO todoVO);

    // 진행 상태별 카운트 조회
    List<TodoStageCountVO> getTodoStageCount(String dept);

    // 정렬된 Todo 데이터 조회
    List<TodoVO> getSortedTodoList(Map<String, String> params);

}
