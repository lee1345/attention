package fs.four.human.todo.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import fs.four.human.todo.service.TodoService;
import fs.four.human.todo.vo.TodoStageCountVO;
import fs.four.human.todo.vo.TodoVO;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@Controller
@RequestMapping("/todo")
public class TodoController {

    @Autowired
    private TodoService todoService;
//

    @GetMapping
    public String todo(Model model, @ModelAttribute TodoVO todoVO) throws JsonProcessingException {
        System.out.println("-----todo-----");

        // DB에서 로그인한유저의 부서(팀)정보를 가져와야한다.나중에 로그인된 사용자의 정보를 DB에서 가져와 group 값을 설정할 예정

//        String group = "Marketing";
        String group = "Development";

        List<TodoVO> todoVOList = todoService.getAllTodo(todoVO);
        model.addAttribute("todos", todoVOList);

        List<TodoStageCountVO> todoStageCountVOList = todoService.getTodoStageCount(group);
        // ObjectMapper를 사용하여 todoStageCounts를 JSON 문자열로 변환
        ObjectMapper objectMapper = new ObjectMapper();
        String todoStageCountsJson = objectMapper.writeValueAsString(todoStageCountVOList);
        model.addAttribute("todoStageCountsJson", todoStageCountsJson);


        return "todo/todo";
    }

}

