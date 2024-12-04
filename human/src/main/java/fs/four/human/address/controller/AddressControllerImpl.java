package fs.four.human.address.controller;

import fs.four.human.address.service.AddressService;
import fs.four.human.address.vo.AddressVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
@RequestMapping("/address")
public class AddressControllerImpl {

    @Autowired
    private AddressService addressService;

    // 기본 주소 페이지 및 주소 데이터 가져오기
    @GetMapping
    public String address(Model model) {
        System.out.println("-----Address-----");

        // Service에서 데이터 가져오기
        List<AddressVO> addressList = addressService.getAllAddress();

        // 모델에 데이터 추가
        model.addAttribute("addressList", addressList);

        // JSP 파일로 전달
        return "address/address"; // JSP 파일 경로
    }

    // 필터와 검색어 기반 조회
    @GetMapping("/search")
    public String searchAddress(@RequestParam("category") String category,
                                @RequestParam("query") String query,
                                Model model) {

        System.out.println("검색 필터 category : " + category);
        System.out.println("검색어 query : " + query);

        // 검색 수행
        List<AddressVO> searchResults = addressService.searchAddress(category, query);
        model.addAttribute("addressList", searchResults); // 검색 결과를 모델에 추가
        return "address/address"; //
    }
}
