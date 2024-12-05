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
    @GetMapping("/search")
    public List<FreeBoardVO> searchFreeBoard(
            @RequestParam("category") String category,
            @RequestParam("query") String query) {

        try {
            System.out.println("검색 필터 category: " + category);
            System.out.println("검색어 query: " + query);

            return freeBoardService.searchFreeBoard(category, query);

        } catch (Exception e) {
            throw new RuntimeException("검색 중 오류가 발생했습니다.");
        }
    }

//    // 새로운 주소 데이터 등록 API
//    @PostMapping("/register")
//    public ResponseEntity<String> createFreeBoard(@RequestBody FreeBoardVO freeBoard) {
//        try {
//            freeBoardService.createFreeBoard(freeBoard);
//            return ResponseEntity.ok("등록 성공!");
//        } catch (Exception e) {
//            e.printStackTrace();
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("등록 실패: " + e.getMessage());
//        }
//    }
}
