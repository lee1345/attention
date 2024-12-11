package fs.four.human.address.controller;

import fs.four.human.address.service.AddressService;
import fs.four.human.address.vo.AddressVO;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/address")
@SessionAttributes("loggedInUserId") // 세션에서 관리할 속성 이름 지정
public class AddressController {

    @Autowired
    private AddressService addressService;

    // 로그인 시 세션에 사용자 ID 저장
    @ModelAttribute("loggedInUserId")
    public String setLoggedInUserId(HttpSession session) {
        String loggedInUserId = (String) session.getAttribute("loginUserID");
        if (loggedInUserId == null || loggedInUserId.isEmpty()) {
            throw new IllegalArgumentException("로그인된 사용자 ID가 없습니다.");
        }
        return loggedInUserId;
    }

    // JSP 페이지 렌더링 (로그인된 사용자 ID 기반으로 전체 데이터 조회)
    @GetMapping
    public String address(HttpSession session, Model model) {
        try {
            // 세션에서 로그인된 사용자 ID 가져오기
            String loggedInUserId = (String) session.getAttribute("loginUserID");

            if (loggedInUserId == null || loggedInUserId.isEmpty()) {
                throw new IllegalArgumentException("로그인된 사용자 ID가 없습니다.");
            }

            // 로그인된 사용자 ID로 주소록 데이터 가져오기
            List<AddressVO> addressList = addressService.getAddressByEmployeeId(loggedInUserId);
            model.addAttribute("addressList", addressList);

            System.out.println("로그인된 사용자 ID: " + loggedInUserId);
            System.out.println("주소록 데이터: " + addressList);

            return "address/address"; // JSP 파일 경로
        } catch (IllegalArgumentException e) {
            e.printStackTrace();
            model.addAttribute("errorMessage", e.getMessage());
            return "login"; // 로그인 페이지로 이동
        } catch (Exception e) {
            e.printStackTrace();
            model.addAttribute("errorMessage", "데이터를 불러오는 중 오류가 발생했습니다.");
            return "error/error"; // 에러 페이지로 이동
        }
    }

    // 검색 처리
    @GetMapping("/search")
    public String searchAddress(
            @RequestParam("category") String category,
            @RequestParam("query") String query,
            @ModelAttribute("loggedInUserId") String loggedInUserId,
            Model model) {

        try {
            System.out.println("검색 필터 category: " + category);
            System.out.println("검색어 query: " + query);

            // 로그인된 사용자의 검색 결과만 반환
            List<AddressVO> searchAddress = addressService.searchAddressByEmployeeId(loggedInUserId, category, query);
            model.addAttribute("addressList", searchAddress);
            return "address/address"; // JSP 파일 경로

        } catch (Exception e) {
            e.printStackTrace();
            model.addAttribute("errorMessage", "검색 중 오류가 발생했습니다.");
            return "error/error"; // 에러 JSP 파일 경로
        }
    }
}
