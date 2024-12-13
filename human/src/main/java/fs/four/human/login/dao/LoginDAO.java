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

    //아이디 찾기
    String findId(@Param("e_name") String e_name, @Param("e_email") String e_email);

    // 이메일 조회
    String findEmailById(@Param("e_id") String e_id);

    // 비밀번호 업데이트
    void updatePassword(@Param("e_id") String e_id, @Param("e_pwd") String e_pwd);
}
