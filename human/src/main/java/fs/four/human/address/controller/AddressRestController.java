package fs.four.human.address.controller;

import fs.four.human.address.service.AddressService;
import fs.four.human.address.vo.AddressVO;
import jakarta.servlet.http.HttpSession;
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
    public List<AddressVO> address(HttpSession session) {
        String emplId = (String) session.getAttribute("loginUserID"); // 세션에서 로그인 ID 가져오기

        if (emplId == null || emplId.isEmpty()) {
            throw new IllegalArgumentException("로그인된 사용자 ID가 없습니다.");
        }

        // 로그인된 사용자의 데이터만 조회
        return addressService.getAddressByEmployeeId(emplId);
    }

    // 검색 결과 반환 (JSON)
    @PostMapping("/search")
    public List<AddressVO> searchAddress(
            @RequestParam("category") String category,
            @RequestParam("query") String query,
            HttpSession session) {
        String emplId = (String) session.getAttribute("loginUserID");

        if (emplId == null || emplId.isEmpty()) {
            throw new IllegalArgumentException("로그인된 사용자 ID가 없습니다.");
        }

        return addressService.searchAddressByEmployeeId(emplId, category, query);
    }

    // 새로운 주소 데이터 등록 API
    @PostMapping("/register")
    public String createAddress(@RequestBody AddressVO address, HttpSession session) {
        String loggedInUserId = (String) session.getAttribute("loginUserID");
        if (loggedInUserId == null || loggedInUserId.isEmpty()) {
            return "로그인된 사용자 ID가 없습니다.";
        }
        address.setAdEmplId(loggedInUserId);
        addressService.createAddress(address);
        return "등록 성공!";
    }

    // 특정 주소록 데이터 반환
    @GetMapping("/{id}")
    public AddressVO getAddressById(@PathVariable("id") int id) {
        AddressVO address = addressService.getAddressById(id);
        if (address == null) {
            throw new IllegalArgumentException("해당 게시판을 찾을 수 없습니다.");
        }
        return address;
    }

    // 주소록 수정
    @PutMapping("/{id}")
    public String updateAddress(@PathVariable("id") int id, @RequestBody AddressVO address) {
        AddressVO existingAddress = addressService.getAddressById(id);

        if (existingAddress == null) {
            return "해당 주소가 존재하지 않습니다.";
        }

        addressService.updateAddress(address);
        return "수정 성공!";
    }

    // 주소 데이터 삭제
    @DeleteMapping("/{id}")
    public String deleteAddress(@PathVariable("id") int id) {
        System.out.println("삭제 요청 ID: " + id); // 디버깅용 로그
        AddressVO address = addressService.getAddressById(id);

        if (address == null) {
            return "해당 주소가 존재하지 않습니다.";
        }

        addressService.deleteAddress(id);
        return "삭제 성공!";
    }

}
