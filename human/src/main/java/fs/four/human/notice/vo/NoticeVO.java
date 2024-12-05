package fs.four.human.notice.vo;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class NoticeVO {
    private String B_ID;            // 게시글 ID
    private String B_TITLE;       // 게시글 제목
    private String B_CONTENT;     // 게시글 내용
    private String B_WRITER;      // 작성자
    private String B_GROUP;       // 그룹
    private String B_CATEGORY;    // 카테고리
    private Date B_CREATED_DATE;   // 생성 날짜
    private Date B_UPDATED_DATE;   // 수정 날짜 (옵션)

    // 기본 생성자
    public NoticeVO() {
    }

}
