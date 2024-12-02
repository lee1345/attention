package fs.four.human.todo.service;



import org.springframework.stereotype.Service;
import java.util.List;


@Service
public class TaskService {

    public List<String> getAllTasks() {
        return List.of("Task 1", "Task 2", "Task 3"); // 테스트 데이터

    }
}
