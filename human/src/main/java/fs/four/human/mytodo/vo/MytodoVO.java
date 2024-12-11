package fs.four.human.mytodo.vo;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;

public class MytodoVO {
    private String t_group;
    private String t_title;
    private String t_priority;
    private String t_content;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
    private Date t_start_date;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
    private Date t_end_date;
    private String t_hide;
    private String t_created_id;
    private String t_dept;

    // Getters and Setters
    public String getT_group() {
        return t_group;
    }

    public void setT_group(String t_group) {
        this.t_group = t_group;
    }

    public String getT_title() {
        return t_title;
    }

    public void setT_title(String t_title) {
        this.t_title = t_title;
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

    public Date getT_start_date() {
        return t_start_date;
    }

    public void setT_start_date(Date t_start_date) {
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

    public String getT_created_id() {
        return t_created_id;
    }

    public void setT_created_id(String t_created_id) {
        this.t_created_id = t_created_id;
    }

    public String getT_dept() {
        return t_dept;
    }

    public void setT_dept(String t_dept) {
        this.t_dept = t_dept;
    }

}
