package fs.four.human.address.vo;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddressVO {
    private String adId;          // 번호
    private String adEmplId;
    private String adName;      // 이름
    private String adPhone;     // 휴대폰
    private String adEmail;     // 이메일
    private String adDeptName;  // 부서명
    private String adGroup;     // 그룹(별칭)

    public AddressVO(){

    }
}
