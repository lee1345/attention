package fs.four.human.common.dao;

import fs.four.human.common.vo.CommonVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface CommonDAO {

    @Select("SELECT message, details FROM common_table")
    List<CommonVO> getCommonData(); // 데이터베이스에서 데이터 조회
}
