package com.verilag.student_details_database.controller.filter;

import com.verilag.student_details_database.models.Student;
import com.verilag.student_details_database.services.filter.StudentFilterService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/students")
public class FilterStudentController {

    private final StudentFilterService studentService;

    public FilterStudentController(StudentFilterService studentService) {
        this.studentService = studentService;
    }

    @GetMapping("/filter")
    public ResponseEntity<?> filterStudents(
            @RequestParam String department,
            @RequestParam String rollNumberPrefix) {
        try {
            List<Student> students = studentService.getStudentsByDepartmentAndRollNumberPrefix(department, rollNumberPrefix);
            return ResponseEntity.ok(students);
        } catch (RuntimeException e) {
            return ResponseEntity.internalServerError().body("Error occurred: " + e.getMessage());
        }
    }
}
