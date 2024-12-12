package fs.four.human.mytodo.Mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import java.util.Map;

@Mapper
public interface MytodoMapper {
    // 상태별 진행 상황 집계 쿼리
    Map<String, Integer> getTodoStats(@Param("group") String group, @Param("userId") String userId);
}
