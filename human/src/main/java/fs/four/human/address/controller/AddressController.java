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
public class AddressController {

    @Autowired
    private AddressService addressService;

    // JSP 페이지 렌더링 (전체 데이터)
    @GetMapping
    public String address(Model model) {
        List<AddressVO> addressList = addressService.getAllAddress();
        model.addAttribute("addressList", addressList);

        return "address/address"; // JSP 파일 경로
    }

    // JSP 페이지 렌더링 (검색 데이터)
    @GetMapping("/search")
    public String searchAddress(
            @RequestParam("category") String category,
            @RequestParam("query") String query,
            Model model) {
        System.out.println("검색 필터 category: " + category);
        System.out.println("검색어 query: " + query);

        List<AddressVO> searchResults = addressService.searchAddress(category, query);
        model.addAttribute("addressList", searchResults);

        return "address/address"; // JSP 파일 경로
    }
}
