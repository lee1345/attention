package fs.four.human.freeBoard.controller;

import fs.four.human.freeBoard.service.FreeBoardService;
import fs.four.human.freeBoard.vo.FreeBoardVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/freeBoard")
public class FreeBoardRestController {

    @Autowired
    private FreeBoardService freeBoardService;

    // 전체 주소 데이터 반환 (JSON)
    @GetMapping
    public List<FreeBoardVO> getAllFreeBoard() {
        try {
            return freeBoardService.getAllFreeBoard();
        } catch (Exception e) {
            throw new RuntimeException("전체 데이터를 가져오는 중 오류가 발생했습니다.");
        }
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

    // 새로운 주소 데이터 등록 API
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
}
