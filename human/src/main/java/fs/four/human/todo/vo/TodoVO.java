package fs.four.human.todo.vo;

import lombok.Data;


import java.time.LocalDateTime;
import java.util.Date;

@Data
public class TodoVO {
    private String t_id;
    private String t_group;     //그룹
    private String t_dept;      //부서
    private String t_stage;    //진행상황
    private String t_priority; //중요도
    private String t_content;  //내용
    private LocalDateTime t_start_date;
    private Date t_end_date;
    private String t_hide;
    private Date t_created_date;
    private Date t_updated_date;
    private String t_updated_id;
    private String t_created_id;
    private String t_title;

    // 검색조건
    private String type;
    private String search;
    private String sort;


    public String getT_id() {
        return t_id;
    }

    public void setT_id(String t_id) {
        this.t_id = t_id;
    }

    public String getT_group() {
        return t_group;
    }

    public void setT_group(String t_group) {
        this.t_group = t_group;
    }

    public String getT_dept() {
        return t_dept;
    }

    public void setT_dept(String t_dept) {
        this.t_dept = t_dept;
    }

    public String getT_stage() {
        return t_stage;
    }

    public void setT_stage(String t_stage) {
        this.t_stage = t_stage;
    }

    public String getT_priority() {
        return t_priority;
    }

    public void setT_priority(String t_priority) {
        this.t_priority = t_priority;
    }

    public String getT_content() {
        return t_content;
    }

    public void setT_content(String t_content) {
        this.t_content = t_content;
    }

    public LocalDateTime getT_start_date() {
        return t_start_date;
    }

    public void setT_start_date(LocalDateTime t_start_date) {
        this.t_start_date = t_start_date;
    }

    public Date getT_end_date() {
        return t_end_date;
    }

    public void setT_end_date(Date t_end_date) {
        this.t_end_date = t_end_date;
    }

    public String getT_hide() {
        return t_hide;
    }

    public void setT_hide(String t_hide) {
        this.t_hide = t_hide;
    }

    public Date getT_created_date() {
        return t_created_date;
    }

    public void setT_created_date(Date t_created_date) {
        this.t_created_date = t_created_date;
    }

    public Date getT_updated_date() {
        return t_updated_date;
    }

    public void setT_updated_date(Date t_updated_date) {
        this.t_updated_date = t_updated_date;
    }

    public String getT_updated_id() {
        return t_updated_id;
    }

    public void setT_updated_id(String t_updated_id) {
        this.t_updated_id = t_updated_id;
    }

    public String getT_created_id() {
        return t_created_id;
    }

    public void setT_created_id(String t_created_id) {
        this.t_created_id = t_created_id;
    }

    public String getT_title() {
        return t_title;
    }

    public void setT_title(String t_title) {
        this.t_title = t_title;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getSearch() {
        return search;
    }

    public void setSearch(String search) {
        this.search = search;
    }
}
