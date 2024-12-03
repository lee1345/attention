package fs.four.human.common.service;

import fs.four.human.common.dao.CommonDAO;
import fs.four.human.common.vo.CommonVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommonServiceImpl implements CommonService {

    @Autowired
    private CommonDAO commonDAO;

    @Override
    public CommonVO getEmployeeInfo(String e_id) {
        return commonDAO.getEmployeeById(e_id); // DAO 호출
    }
}
