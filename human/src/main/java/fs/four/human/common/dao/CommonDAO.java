package fs.four.human.common.dao;

import fs.four.human.common.vo.CommonVO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface CommonDAO {

    // e_id를 통해 사용자 정보 조회, MyBatis 매퍼 메서드 매핑
    CommonVO getEmployeeById(String e_id);
}
