package fs.four.human.mytodo.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/mytodo")
public class MytodoControllerImpl implements MytodoController {

//    @Autowired
//    private TodoService todoService;
//

    @GetMapping
    public ModelAndView todo(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("-----mytodo-----");
        return new ModelAndView("mytodo/mytodo");
    }

}

