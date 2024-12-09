package fs.four.human.common.service;

import fs.four.human.common.vo.CommonVO;

public interface CommonService {
    // 사용자 정보를 가져오는 메서드
    CommonVO getEmployeeInfo(String e_id);
}
