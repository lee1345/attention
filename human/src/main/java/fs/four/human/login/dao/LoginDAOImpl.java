package fs.four.human.login.dao;

import fs.four.human.login.vo.LoginVO;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class LoginDAOImpl implements LoginDAO {

    private final SqlSession sqlSession;

    @Autowired
    public LoginDAOImpl(SqlSession sqlSession) {
        this.sqlSession = sqlSession;
    }

    @Override
    public void insertMember(LoginVO loginVO) {
        sqlSession.insert("fs.four.human.login.dao.LoginDAO.insertMember", loginVO);
    }
}