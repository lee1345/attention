package fs.four.human.address.controller;

import fs.four.human.address.service.AddressService;
import fs.four.human.address.vo.AddressVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/address")
public class AddressRestController {

    @Autowired
    private AddressService addressService;

    // 전체 주소 데이터 반환 (JSON)
    @GetMapping
    public List<AddressVO> getAllAddress() {
        try {
            return addressService.getAllAddress();
        } catch (Exception e) {
            throw new RuntimeException("전체 데이터를 가져오는 중 오류가 발생했습니다.");
        }
    }

    // 검색 결과 반환 (JSON)
    @GetMapping("/search")
    public List<AddressVO> searchAddress(
            @RequestParam("category") String category,
            @RequestParam("query") String query) {

        try {
            System.out.println("검색 필터 category: " + category);
            System.out.println("검색어 query: " + query);

            return addressService.searchAddress(category, query);
        } catch (Exception e) {
            throw new RuntimeException("검색 중 오류가 발생했습니다.");
        }
    }
}
