package fs.four.human.address.controller;

import fs.four.human.address.service.AddressService;
import fs.four.human.address.vo.AddressVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/address")
public class AddressControllerImpl {

    @Autowired
    private AddressService addressService;

    // 기본 주소 페이지 및 주소 데이터 가져오기
    @GetMapping
    public String address(Model model) {
        System.out.println("----- Loading Address Page -----");

        // Service에서 데이터 가져오기
        List<AddressVO> addressList = addressService.getAllAddress();

        // 가져온 데이터 로그로 출력 (디버깅용)
        System.out.println("Address List: " + addressList);

        // 모델에 데이터 추가
        model.addAttribute("addressList", addressList);

        // JSP 파일로 전달
        return "address/address"; // JSP 파일 경로
    }
}
