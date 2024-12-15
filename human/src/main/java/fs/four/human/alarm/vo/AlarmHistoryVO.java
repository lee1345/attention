package fs.four.human.alarm.vo;

import java.util.Date;

public class AlarmHistoryVO {
    private Long al_id;
    private String al_employee;
    private Date al_time;
    private String al_cycle;
    private String al_status;
    private Long al_t_id;
    private Date al_created_date;
    private String al_created_id;

    // Getters and Setters
    public Long getAl_id() { return al_id; }
    public void setAl_id(Long al_id) { this.al_id = al_id; }

    public String getAl_employee() { return al_employee; }
    public void setAl_employee(String al_employee) { this.al_employee = al_employee; }

    public Date getAl_time() { return al_time; }
    public void setAl_time(Date al_time) { this.al_time = al_time; }

    public String getAl_cycle() { return al_cycle; }
    public void setAl_cycle(String al_cycle) { this.al_cycle = al_cycle; }

    public String getAl_status() { return al_status; }
    public void setAl_status(String al_status) { this.al_status = al_status; }

    public Long getAl_t_id() { return al_t_id; }
    public void setAl_t_id(Long al_t_id) { this.al_t_id = al_t_id; }

    public Date getAl_created_date() { return al_created_date; }
    public void setAl_created_date(Date al_created_date) { this.al_created_date = al_created_date; }

    public String getAl_created_id() { return al_created_id; }
    public void setAl_created_id(String al_created_id) { this.al_created_id = al_created_id; }
}