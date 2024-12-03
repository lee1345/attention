package fs.four.human.address.controller;

import org.springframework.ui.Model;
import fs.four.human.address.service.AddressService;
import fs.four.human.address.vo.AddressVO;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@Controller
@RequestMapping("/address")
public class AddressControllerImpl {

    @Autowired
    private AddressService addressService;
    
//    기본 주소 페이지 
    @GetMapping
    public ModelAndView address(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("-----address--------");
        return new ModelAndView("address/address");
    }
    
//    주소 데이터를 가져와 JSP에 전달
    @GetMapping("/address")
    public String getAddress(Model model) {
        List<AddressVO> addressList = addressService.getAllAddress(); // 데이터 가져오기
        model.addAttribute("addressList", addressList); // 데이터를 JSP로 전달
        return "address/address"; // JSP 파일명
    }

}
