package fs.four.human.addressBook.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/addressBook")
public class AddressBookControllerImpl implements AddressBookController {
    @GetMapping
    public ModelAndView addressBook(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("-----addressBook--------");
        return new ModelAndView("addressBook/addressBook");
    }
    // 주소록 데이터 등록
    @GetMapping("/add")
    public ModelAndView addAddress() {
        return new ModelAndView("addressBook/addAddress"); // JSP 위치
    }

    // 주소록 데이터 수정
    @GetMapping("/edit")
    public ModelAndView editAddress() {
        return new ModelAndView("addressBook/editAddress"); // JSP 위치
    }
}
