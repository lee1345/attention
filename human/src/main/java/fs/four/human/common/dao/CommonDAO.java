package fs.four.human.common.dao;

import fs.four.human.common.vo.CommonVO;

public interface CommonDAO {
    // e_id를 통해 사용자 정보 조회
    CommonVO getEmployeeById(String e_id);
}
