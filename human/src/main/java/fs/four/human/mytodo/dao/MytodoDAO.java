package fs.four.human.mytodo.dao;

import fs.four.human.login.vo.LoginVO;
import fs.four.human.mytodo.vo.MytodoVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface MytodoDAO {
    // 할일등록
    void insertTodo(MytodoVO mytodoVO);

    // 사용자 ID로 부서 정보 조회
    String getDeptById(String e_id);

    // 할일 조회
    List<MytodoVO> getMyTodos(@Param("t_group") String t_group, @Param("t_created_id") String t_created_id);

}
