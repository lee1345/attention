package fs.four.human.address.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.servlet.ModelAndView;

public interface AddressController {

    public ModelAndView address(HttpServletRequest reqeust, HttpServletResponse response) throws Exception;
}
