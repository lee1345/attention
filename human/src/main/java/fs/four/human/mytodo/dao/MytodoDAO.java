package fs.four.human.mytodo.dao;

import fs.four.human.login.vo.LoginVO;
import fs.four.human.mytodo.vo.MytodoVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
@Mapper
public interface MytodoDAO {

    // 할일등록
    void insertTodo(MytodoVO mytodoVO);

    // 사용자 ID로 부서 정보 조회
    String getDeptById(String e_id);

    // 할일 조회
    List<MytodoVO> getMyTodos(
            @Param("t_group") String t_group,
            @Param("t_created_id") String t_created_id);

    // 버튼으로 상태 변경
    void updateStage(
            @Param("t_id") Long t_id,
            @Param("t_stage") String t_stage);

    // 할일 삭제
    void deleteTodoById(
            @Param("t_id") Long t_id);

    // 정렬기능
    List<MytodoVO> getSortedTodos(
            @Param("t_group") String t_group,
            @Param("t_created_id") String t_created_id,
            @Param("sortType") String sortType);

    //선택 삭제,
    void deleteSelectedTodos(
            @Param("ids") List<Long> ids);
    //선택 숨기기
    void updateHideStatus(
            @Param("ids") List<Long> ids,
            @Param("hideStatus") String hideStatus);
    //숨기기 취소
    void updateHideAll();
    
    //수정하기    
    void updateTodo(MytodoVO mytodoVO);
    
    //가져오기
    MytodoVO getTodoById(
            @Param("t_id") Long t_id);
    // 상태별 진행 상황 집계
    Map<String, Integer> getTodoStats(String group, String userId);
}
