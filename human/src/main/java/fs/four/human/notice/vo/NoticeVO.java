package fs.four.human.notice.vo;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NoticeVO {
    private String bId;
    private String bTitle;
    private String bContent;
    private String bWriter;
    private String bGroup;
    private String bCategory;

    public NoticeVO(){

    }
}
