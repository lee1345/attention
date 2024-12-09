package fs.four.human.common.service;

import fs.four.human.common.dao.CommonDAO;
import fs.four.human.common.vo.CommonVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class CommonServiceImpl implements CommonService{

    @Autowired
    private CommonDAO commonDAO;

    // 직위 및 부서 매핑 테이블
    private static final Map<String, String> POSITION_MAP = Map.of(
            "C", "대표",
            "SM", "수석",
            "M", "매니저",
            "SA", "선임",
            "JA", "사원"
    );

    private static final Map<String, String> DEPT_MAP = Map.of(
            "M", "경영",
            "H", "인사",
            "F", "재무",
            "S", "영업마케팅"
    );


    public CommonVO getEmployeeInfo(String e_id) {
        CommonVO employee = commonDAO.getEmployeeById(e_id);
        if (employee != null) {
            // 매핑된 직위 및 부서 값 설정
            employee.setE_position(POSITION_MAP.get(employee.getE_position()));
            employee.setE_dept(DEPT_MAP.get(employee.getE_dept()));
        }
        return employee;
    }
}
