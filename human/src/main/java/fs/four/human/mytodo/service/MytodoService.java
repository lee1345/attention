package fs.four.human.mytodo.service;

import fs.four.human.common.service.CommonService;
import fs.four.human.login.vo.LoginVO;
import fs.four.human.mytodo.dao.MytodoDAO;
import fs.four.human.mytodo.vo.MytodoVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MytodoService {

    @Autowired
    private MytodoDAO mytodoDAO;

    @Autowired
    private CommonService commonService;

    public void addTodo(MytodoVO mytodoVO, String userId) {
        // 부서 정보 조회 및 설정
        String dept = commonService.getEmployeeInfo(userId).getE_dept();
        mytodoVO.setT_dept(dept);

        // 할일 등록
        mytodoDAO.insertTodo(mytodoVO);
    }
}


