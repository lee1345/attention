package fs.four.human.common.service;

import fs.four.human.common.vo.CommonVO;

public interface CommonService {
    // 사용자 정보 조회
    CommonVO getEmployeeInfo(String e_id);
}
