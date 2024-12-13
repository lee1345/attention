package fs.four.human.todo.controller;

import fs.four.human.todo.service.TodoService;
import fs.four.human.todo.vo.ResponseDTO;
import fs.four.human.todo.vo.Todo2VO;
import fs.four.human.todo.vo.TodoVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/todo")
public class TodoRestController {
    @Autowired
    TodoService todoService;

    @PostMapping("/todos")
    public ResponseEntity<ResponseDTO<String>> test2(@RequestBody Todo2VO todoVO) {
        System.out.println(todoVO);
        todoService.addTodo(todoVO);

        return new ResponseEntity<>(new ResponseDTO<String>("success", null), HttpStatus.OK);
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateTodo(@PathVariable("id") String id, @RequestBody TodoVO todoVO) {
        if (todoVO.getT_title() == null || todoVO.getT_title().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Title cannot be empty");
        }
        if (todoVO.getT_stage() == null || todoVO.getT_stage().equals("진행상황을 선택")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Stage cannot be empty");
        }

        todoVO.setT_id(id);
        int result = todoService.updateTodo(todoVO);

        if (result > 0) {
            return ResponseEntity.ok("Update successful");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Update failed");
        }
    }
}
