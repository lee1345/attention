package fs.four.human.login.dao;
import fs.four.human.login.vo.LoginVO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface LoginDAO {
    void insertMember(LoginVO loginVO);

}
