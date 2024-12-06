package fs.four.human.address.controller;

import fs.four.human.address.service.AddressService;
import fs.four.human.address.vo.AddressVO;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

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
    @PostMapping("/search")
    public List<AddressVO> searchAddress(
            @RequestParam("category") String category,
            @RequestParam("query") String query) {
        try {
            // 디버깅 로그
            System.out.println("받은 카테고리: " + category);
            System.out.println("받은 검색어: " + query);

            // 검색 조건 검증
            if (category == null || category.isEmpty() || query == null || query.isEmpty()) {
                throw new IllegalArgumentException("검색 필터 또는 검색어가 비어 있습니다.");
            }

            // 검색 결과 반환
            return addressService.searchAddress(category, query);

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
    public String createAddress(@RequestBody AddressVO address) {
        try {
            // 디버깅 로그
            System.out.println("받은 데이터: " + address);
            addressService.createAddress(address);
            return "등록 성공!";
        } catch (Exception e) {
            e.printStackTrace();
            return "등록 실패: " + e.getMessage();
        }
    }
}
