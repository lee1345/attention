package fs.four.human.common.service;

import fs.four.human.common.vo.CommonVO;

public interface CommonService {
    // 사용자 정보를 가져오는 메서드
    CommonVO getEmployeeInfo(String e_id);
    // 사용자 정보 업데이트 메서드
    boolean updateEmployeeInfo(CommonVO employee);
}
