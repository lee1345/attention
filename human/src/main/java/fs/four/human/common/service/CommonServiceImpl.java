package fs.four.human.common.service;

import fs.four.human.common.dao.CommonDAO;
import fs.four.human.common.vo.CommonVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommonServiceImpl implements CommonService {

    @Autowired
    private CommonDAO commonDAO;

    @Override
    public List<CommonVO> common() throws Exception {
        return commonDAO.getCommonData();
    }
}
