package fs.four.human.login.dao;

import fs.four.human.login.vo.LoginVO;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.apache.ibatis.annotations.Mapper;

@Repository
public class LoginDAOImpl implements LoginDAO {

    @Autowired
    private SqlSession sqlSession;

    @Override
    public void insertMember(LoginVO loginVO) {
        sqlSession.insert("fs.four.human.login.dao.LoginDAO.insertMember", loginVO);
    }
}
