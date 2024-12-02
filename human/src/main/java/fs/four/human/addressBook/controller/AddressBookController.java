package fs.four.human.addressBook.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.servlet.ModelAndView;

public interface AddressBookController {

    public ModelAndView addressBook(HttpServletRequest reqeust, HttpServletResponse response) throws Exception;
}
