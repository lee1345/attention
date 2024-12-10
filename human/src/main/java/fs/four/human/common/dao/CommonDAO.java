package fs.four.human.common.dao;

import fs.four.human.common.vo.CommonVO;
import fs.four.human.todo.vo.TodoVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface CommonDAO {

    // e_id를 통해 사용자 정보 조회, MyBatis 매퍼 메서드 매핑
    CommonVO getEmployeeById(String e_id);

    int updateEmployee(CommonVO employee); // 사용자 정보 업데이트 메서드
    //알림
//    List<TodoVO> getAlertTodos(
//            @Param("sessionId") String sessionId); // 알림 대상 할 일 가져오기

}

