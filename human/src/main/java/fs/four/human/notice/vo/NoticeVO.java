package fs.four.human.notice.vo;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class NoticeVO {
    private Long bId;            // 게시글 ID
    private String bTitle;       // 게시글 제목
    private String bContent;     // 게시글 내용
    private String bWriter;      // 작성자
    private String bGroup;       // 그룹
    private String bCategory;    // 카테고리
    private Date bCreatedDate;   // 생성 날짜
    private Date bUpdatedDate;   // 수정 날짜 (옵션)

    // 기본 생성자
    public NoticeVO() {
    }

}
