package fs.four.human.freeBoard.controller;

import fs.four.human.freeBoard.service.FreeBoardService;
import fs.four.human.freeBoard.vo.FreeBoardVO;
import fs.four.human.notice.vo.NoticeVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/freeBoard")
public class FreeBoardRestController {

    @Autowired
    private FreeBoardService freeBoardService;

    // 전체 데이터 반환 (JSON)
    @GetMapping
    public List<FreeBoardVO> getAllFreeBoard() {
        try {
            return freeBoardService.getAllFreeBoard();
        } catch (Exception e) {
            throw new RuntimeException("전체 데이터를 가져오는 중 오류가 발생했습니다.");
        }
    }

    // 카테고리별 조회
    @GetMapping("/category/{category}")
    public List<FreeBoardVO> getFreeBoardByCategory(@PathVariable String category) {
        return freeBoardService.getFreeBoardByCategory(category);
    }

    // 검색 결과 반환 (JSON)
    @PostMapping("/search")
    public List<FreeBoardVO> searchFreeBoard(
            @RequestParam("category") String category,
            @RequestParam("query") String query) {

        try {
            // 디버깅 로그
            System.out.println("검색 필터 category: " + category);
            System.out.println("검색어 query: " + query);

            // 검색 조건 검증
            if (category == null || category.isEmpty() || query == null || query.isEmpty()) {
                throw new IllegalArgumentException("검색 필터 또는 검색어가 비어 있습니다.");
            }

            // 검색 결과 반환
            return freeBoardService.searchFreeBoard(category, query);

        } catch (IllegalArgumentException e) {
            e.printStackTrace();
            throw e; // 클라이언트에 예외 전달

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("검색 중 문제가 발생했습니다.");
        }
    }

    // 게시판 데이터 등록 API
    @PostMapping("/register")
    @ResponseBody
    public String createFreeBoard(@RequestBody FreeBoardVO freeBoard) {
        try {
            // 디버깅: 전달받은 데이터 확인
            System.out.println("제목: " + freeBoard.getB_Title());
            System.out.println("내용: " + freeBoard.getB_Content());

            // 내용이 null 또는 비어있으면 예외 처리
            if (freeBoard.getB_Content() == null || freeBoard.getB_Content().trim().isEmpty()) {
                throw new IllegalArgumentException("내용은 필수 입력 항목입니다.");
            }

            // 서비스 호출
            freeBoardService.createFreeBoard(freeBoard);
            return "등록 성공!";

        } catch (Exception e) {
            e.printStackTrace();
            return "등록 실패: " + e.getMessage();
        }
    }

    // 특정 게시판 데이터 반환
    @GetMapping("/{id}")
    public FreeBoardVO getFreeBoardById(@PathVariable("id") int id) {

        // 조회수 증가 로직 추가
        freeBoardService.incrementViewCount(id); // 조회수 증가

        // 게시판 데이터 반환
        FreeBoardVO freeBoard = freeBoardService.getFreeBoardById(id);

        if (freeBoard == null) {
            throw new IllegalArgumentException("해당 게시판을 찾을 수 없습니다.");
        }
        return freeBoard;
    }
    
    // 게시판 수정
    @PutMapping("/{id}")
    public String updateFreeBoard(@PathVariable("id") int id, @RequestBody FreeBoardVO freeBoard) {
        FreeBoardVO existingBoard = freeBoardService.getFreeBoardById(id);

        if (existingBoard == null) {
            return "해당 게시글이 존재하지 않습니다.";
        }

        if (!existingBoard.getB_Writer().equals(freeBoard.getB_Writer())) {
            return "수정 권한이 없습니다.";
        }

        freeBoardService.updateFreeBoard(freeBoard);
        return "수정 성공!";
    }

    // 게시판 삭제
    @DeleteMapping("/{id}")
    public String deleteFreeBoard(@PathVariable("id") int id, @RequestParam("user") String user) {
        FreeBoardVO freeBoard = freeBoardService.getFreeBoardById(id);

        if (user == null || user.isEmpty()) {
            return "삭제 요청에서 사용자 정보가 누락되었습니다.";
        }

        if (freeBoard == null) {
            return "해당 게시글이 존재하지 않습니다.";
        }

        if (!freeBoard.getB_Writer().equals(user)) {
            return "삭제 권한이 없습니다.";
        }

        freeBoardService.deleteFreeBoard(id);
        return "삭제 성공!";
    }

    // 제목클릭 정렬
    @GetMapping("/sort")
    public List<FreeBoardVO> sortFreeBoard(
            @RequestParam String column,
            @RequestParam String order)

    {
        return freeBoardService.sortFreeBoard(column, order);
    }

}
