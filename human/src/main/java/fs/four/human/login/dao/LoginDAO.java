package fs.four.human.login.dao;

import fs.four.human.login.vo.LoginVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface LoginDAO {

    //회원가입
    void insertMember(LoginVO loginVO);

    //로그인
    String loginMatching(
            @Param("e_id") String e_id);

    //아이디 중복체크
    String newIdCheck(
            @Param("e_id") String e_id);
}
