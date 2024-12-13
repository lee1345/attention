package fs.four.human.todo.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import fs.four.human.common.vo.CommonVO;
import fs.four.human.todo.service.TodoService;
import fs.four.human.todo.vo.Todo2VO;
import fs.four.human.todo.vo.TodoPriorityCountVO;
import fs.four.human.todo.vo.TodoStageCountVO;
import fs.four.human.todo.vo.TodoVO;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@Controller
@RequestMapping("/todo")
public class TodoController {

    @Autowired
    private TodoService todoService;
//

    @GetMapping
    public String todo(Model model, @ModelAttribute TodoVO todoVO, HttpSession session) throws JsonProcessingException {
        System.out.println("-----todo-----");

        // DB에서 로그인한유저의 부서(팀)정보를 가져와야한다.나중에 로그인된 사용자의 정보를 DB에서 가져와 group 값을 설정할 예정
        String loginUserID = (String) session.getAttribute("loginUserID");
        System.out.println("loginUserID: "+ loginUserID);
        if(loginUserID == null) loginUserID = "hm";
        CommonVO commonVO = todoService.getEmployeeById(loginUserID);

//        String group = "Marketing";
        String dept = "M";
        if(commonVO != null) dept = commonVO.getE_dept();

        List<Todo2VO> todoVOList = todoService.getAllTodo(todoVO);
        System.out.println("Title: " + todoVO.getT_title()); // 디버깅
        System.out.println(todoVOList); // 디버깅
        model.addAttribute("todos", todoVOList);

        List<TodoStageCountVO> todoStageCountVOList = todoService.getTodoStageCount(dept);
        // ObjectMapper를 사용하여 todoStageCounts를 JSON 문자열로 변환
        ObjectMapper objectMapper = new ObjectMapper();
        String todoStageCountsJson = objectMapper.writeValueAsString(todoStageCountVOList);
        model.addAttribute("todoStageCountsJson", todoStageCountsJson);




        return "todo/todo";
    }

}

