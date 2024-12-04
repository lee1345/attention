package fs.four.human.login.vo;

import java.sql.Date;

public class LoginVO {
    String e_id;
    String e_name;
    String e_pwd;
    String e_phone;
    String e_email;
    String e_dept;
    String e_position;
    Date e_created_date;
    Date e_updated_date;

    public LoginVO(String e_id, String e_name, String e_pwd, String e_phone, String e_email, String e_position, String e_dept) {
        this.e_id = e_id;
        this.e_name = e_name;
        this.e_pwd = e_pwd;
        this.e_phone = e_phone;
        this.e_email = e_email;
        this.e_dept = e_dept;
        this.e_position = e_position;
    }

    public String getE_id() {
        return e_id;
    }

    public void setE_id(String e_id) {
        this.e_id = e_id;
    }

    public String getE_name() {
        return e_name;
    }

    public void setE_name(String e_name) {
        this.e_name = e_name;
    }

    public String getE_pwd() {
        return e_pwd;
    }

    public void setE_pwd(String e_pwd) {
        this.e_pwd = e_pwd;
    }

    public String getE_phone() {
        return e_phone;
    }

    public void setE_phone(String e_phone) {
        this.e_phone = e_phone;
    }

    public String getE_email() {
        return e_email;
    }

    public void setE_email(String e_email) {
        this.e_email = e_email;
    }


    public String getE_dept() {
        return e_dept;
    }

    public void setE_dept(String e_dept) {
        this.e_dept = e_dept;
    }

    public String getE_position() {
        return e_position;
    }

    public void setE_position(String e_position) {
        this.e_position = e_position;
    }

    public Date getE_created_date() {
        return e_created_date;
    }

    public void setE_created_date(Date e_created_date) {
        this.e_created_date = e_created_date;
    }

    public Date getE_updated_date() {
        return e_updated_date;
    }

    public void setE_updated_date(Date e_updated_date) {
        this.e_updated_date = e_updated_date;
    }
}
