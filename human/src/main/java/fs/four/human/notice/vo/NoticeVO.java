package fs.four.human.notice.vo;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class NoticeVO {
    private int b_Id;          // 게시글 ID
    private String b_Title;       // 게시글 제목
    private String b_Content;     // 게시글 내용
    private String b_Writer;      // 작성자
    private String b_Group;       // 그룹
    private String b_Category;    // 카테고리
    private Date b_CreatedDate;   // 생성 날짜
    private Date b_UpdatedDate;   // 수정 날짜 (옵션)

    // 기본 생성자
    public NoticeVO() {
    }

}
