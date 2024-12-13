package fs.four.human.todo.vo;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List; // 추가
import java.util.Date;
import java.time.LocalDate; // 변경된 타입
import java.util.Date;

@Data
public class Todo2VO {
    private String t_id;
    private String t_group;     //그룹
    private String t_dept;      //부서
    private String t_stage;    //진행상황
    private String t_priority; //중요도
    private String t_content;  //내용
    private String t_start_date; // 변경
    private String t_end_date;   // 변경
    private String t_hide;
    private Date t_created_date;
    private Date t_updated_date;
    private String t_updated_id;
    private String t_created_id;
    private String t_title;
    private String t_writer;
    private String e_name;

    private List<String> participants;
}
