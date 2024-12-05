package fs.four.human.freeBoard.controller;

import fs.four.human.freeBoard.vo.FreeBoardVO;
import fs.four.human.freeBoard.service.FreeBoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
@RequestMapping("/freeBoard")
public class FreeBoardController {

    @Autowired
    private FreeBoardService freeBoardService;

    // JSP 페이지 렌더링 ( 전체 데이터 )
    @GetMapping
    public String freeBoard(Model model) {
        try {
            List<FreeBoardVO> freeBoardList = freeBoardService.getAllFreeBoard();
            System.out.println(freeBoardList.toString());
            model.addAttribute("freeBoardList", freeBoardList);
            System.out.println("-----freeBoard-----");
            return "freeBoard/freeBoard"; // JSP 파일 경로

        } catch (Exception e) {
            e.printStackTrace();
            model.addAttribute("errorMessage", "데이터를 불러오는 중 오류가 발생했습니다.");
            return "error/error"; // 에러 JSP 파일 경로
        }
    }

    // JSP 페이지 렌더링 (검색 데이터)
    @GetMapping("/search")
    public String searchFreeBoard(
            @RequestParam("category") String category,
            @RequestParam("query") String query, Model model) {

        try {
            System.out.println("검색 필터 category: " + category);
            System.out.println("검색어 query: " + query);

            List<FreeBoardVO> searchFreeBoard = freeBoardService.searchFreeBoard(category, query);
            model.addAttribute("freeBoardList", searchFreeBoard);
            return "freeBoard/freeBoard"; // JSP 파일 경로

        } catch (Exception e) {
            e.printStackTrace();
            model.addAttribute("errorMessage", "검색 중 오류가 발생했습니다.");
            return "error/error"; // 에러 JSP 파일 경로
        }
    }
}
