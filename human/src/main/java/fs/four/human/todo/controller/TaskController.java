package fs.four.human.todo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.Arrays;
import java.util.List;

@Controller
public class TaskController {

    @GetMapping("/todo")
    public String taskList(Model model) {
        // 테스트용 데이터
        List<String> tasks = Arrays.asList("Task 1", "Task 2", "Task 3");
        model.addAttribute("tasks", tasks); // "tasks" 이름으로 데이터를 뷰로 전달
        return "todo/todo"; // 뷰 이름 반환
    }
}
