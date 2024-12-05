package fs.four.human.login.service;

import fs.four.human.login.dao.LoginDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginRestService {

    @Autowired
    private LoginDAO loginDAO;

    public boolean validateLogin(String e_id, String e_pwd) {
        String storedPassword = loginDAO.loginMatching(e_id);
        return storedPassword != null && storedPassword.equals(e_pwd);
    }

    public boolean checkId(String e_id) {
        String checkId = loginDAO.newIdCheck(e_id);
        return checkId == null;
    }

}
