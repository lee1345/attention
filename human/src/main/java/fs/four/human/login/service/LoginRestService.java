package fs.four.human.login.service;

import fs.four.human.login.dao.LoginDAO;
import fs.four.human.login.vo.LoginVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class LoginRestService {

    @Autowired
    private LoginDAO loginDAO;

    public void signUp(LoginVO loginVO) {
        loginDAO.insertMember(loginVO);
    }

    public boolean validateLogin(LoginVO loginVO) {
        LoginVO user = loginDAO.findUserById(loginVO.getE_id());
        if (user != null && user.getE_pwd().equals(loginVO.getE_pwd())) {
            return true;
        }
        return false;
    }
}
