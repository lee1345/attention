package fs.four.human.mytodo.dao;

import fs.four.human.login.vo.LoginVO;
import fs.four.human.mytodo.vo.MytodoVO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MytodoDAO {
    void insertTodo(MytodoVO mytodoVO);
    String getDeptById(String e_id); // 사용자 ID로 부서 정보 조회

}
