package fs.four.human.common.vo;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommonVO {
    private String e_id;
    private String e_name;
    private String e_pwd;
    private String e_phone;
    private String e_email;
    private String e_position;
    private String e_dept;
    private String e_created_date;
    private String e_updated_date;

    public CommonVO(){
    }
}
