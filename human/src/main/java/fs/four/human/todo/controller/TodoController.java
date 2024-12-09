package fs.four.human.todo.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import fs.four.human.todo.service.TodoService;
import fs.four.human.todo.vo.TodoStageCountVO;
import fs.four.human.todo.vo.TodoVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;


import java.util.List;

@Controller
@RequestMapping("/todo")
public class TodoController {

    @Autowired
    private TodoService todoService;

//    @GetMapping
//    public String todo(Model model, @ModelAttribute TodoVO todoVO) throws JsonProcessingException {
//        System.out.println("-----todo-----");
//
//        // DB에서 로그인한유저의 부서(팀)정보를 가져와야한다.나중에 로그인된 사용자의 정보를 DB에서 가져와 group 값을 설정할 예정
//
//        // String group = "Marketing";
//        String dept = "M";
//
//        List<TodoVO> todoVOList = todoService.getAllTodo(todoVO);
//        model.addAttribute("todos", todoVOList);
//
//        List<TodoStageCountVO> todoStageCountVOList = todoService.getTodoStageCount(dept);
//        // ObjectMapper를 사용하여 todoStageCounts를 JSON 문자열로 변환
//        ObjectMapper objectMapper = new ObjectMapper();
//        String todoStageCountsJson = objectMapper.writeValueAsString(todoStageCountVOList);
//        model.addAttribute("todoStageCountsJson", todoStageCountsJson);
//
//        return "todo/todo";
//    }

    @GetMapping
    public String todo(@RequestParam(required = false) String sortField,
                       @RequestParam(required = false) String sortOrder,
                       @RequestParam(required = false) String type,
                       @RequestParam(required = false) String search,
                       Model model, @ModelAttribute TodoVO todoVO) throws JsonProcessingException {
        System.out.println("-----todo-----");

        // 정렬 기본값 설정
        String field = (sortField == null || sortField.isEmpty()) ? "T_ID" : sortField;
        String order = (sortOrder == null || sortOrder.isEmpty()) ? "ASC" : sortOrder;

        // 검색 조건 설정
        todoVO.setType(type);
        todoVO.setSearch(search);

        // 검색 및 정렬된 데이터 가져오기
        List<TodoVO> todoVOList = todoService.getFilteredTodoList(todoVO, field, order);
        model.addAttribute("todos", todoVOList);

        // 진행 상태별 카운트 데이터 가져오기
        String dept = "M"; // TODO: 로그인 사용자 기준으로 부서 가져오기
        List<TodoStageCountVO> todoStageCountVOList = todoService.getTodoStageCount(dept);

        // JSON 변환 및 전달
        ObjectMapper objectMapper = new ObjectMapper();
        String todoStageCountsJson = objectMapper.writeValueAsString(todoStageCountVOList);
        model.addAttribute("todoStageCountsJson", todoStageCountsJson);

        return "todo/todo";
    }
}
