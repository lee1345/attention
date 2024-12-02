package fs.four.human.todo.controller;


import fs.four.human.todo.service.TaskService; // TaskService를 import
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class TaskController {

    @Autowired
    private TaskService taskService;

    @GetMapping("/todo/todo.do")
    public String taskList(Model model) {
        model.addAttribute("tasks", taskService.getAllTasks());
        return "todo/todo";
    }
}
