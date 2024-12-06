package fs.four.human.login.controller;

import fs.four.human.login.vo.LoginVO;
import fs.four.human.login.service.LoginService;
import fs.four.human.todo.controller.TodoController;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/todo")
public class TodoControllerImpl implements TodoController {

//    @Autowired
//    private TodoService todoService;
//

    @GetMapping
    public ModelAndView todo(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("-----todo-----");
        return new ModelAndView("todo/todo");
    }

}

