package fs.four.human.todo.vo;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Data
public class TodoVO {
//    T_ID INT PRIMARY KEY CHECK (T_ID BETWEEN 1000 AND 9999),
//    T_WRITER VARCHAR2(30) NOT NULL,
//    T_GROUP VARCHAR2(70) NOT NULL,
//    T_DEPT VARCHAR2(50) NOT NULL,
//    T_STAGE VARCHAR2(2) DEFAULT 'P' NOT NULL,
//    T_PRIORITY VARCHAR2(10) DEFAULT 'N' NOT NULL,
//    T_CONTENT VARCHAR2(350),
//    T_START_DATE DATE NOT NULL,
//    T_START_TIME DATE NOT NULL,
//    T_END_DATE DATE NOT NULL,
//    T_HIDE VARCHAR2(1) DEFAULT 'N' CHECK (T_HIDE IN ('Y', 'N')),
//    T_CREATED_DATE DATE DEFAULT SYSDATE,
//    T_UPDATED_DATE DATE DEFAULT SYSDATE,
//    T_UPDATED_ID VARCHAR2(20),
//    T_CREATED_ID VARCHAR2(20)

    private String t_id;
    private String t_group;     //그룹
    private String t_dept;      //부서
    private String t_stage;    //진행상황
    private String t_priority; //중요도
    private String t_content;  //내용
    private String t_start_date;
    private String t_start_time;
    private String t_end_date;
    private String t_hide;
    private Date t_created_date;
    private Date t_updated_date;
    private String t_updated_id;
    private String t_created_id;

    // 검색조건
    private String type;
    private String search;

}
