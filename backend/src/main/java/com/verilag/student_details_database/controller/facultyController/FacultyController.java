package com.verilag.student_details_database.controller.facultyController;

import com.verilag.student_details_database.models.Student;
import com.verilag.student_details_database.services.faculty.StudentFetchService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/faculty")
public class FacultyController {
    private final StudentFetchService studentService;

    public FacultyController(StudentFetchService studentService) {
        this.studentService = studentService;
    }

    // Endpoint to get students under the logged-in FA
    @GetMapping("/students/{faId}")
    public ResponseEntity<List<Student>> getStudentsUnderFA(@PathVariable Long faId) {
        List<Student> students = studentService.getStudentsByFAId(faId);
        return ResponseEntity.ok(students);
    }
}
