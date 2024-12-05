package fs.four.human.login.service;

import fs.four.human.login.dao.LoginDAO;
import fs.four.human.login.vo.LoginVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginServiceImpl implements LoginService{

    @Autowired
    private LoginDAO loginDAO;

    @Override
    public void signUp(LoginVO loginVO) {
        loginDAO.insertMember(loginVO);
    }
}
