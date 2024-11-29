package fs.four.human.common.service;

import fs.four.human.common.vo.CommonVO;

import java.util.List;

public interface CommonService {
    List<CommonVO> common() throws Exception; // 명확한 반환 타입 설정
}
