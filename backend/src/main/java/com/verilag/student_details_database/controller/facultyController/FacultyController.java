package com.verilag.student_details_database.controller.facultyController;

import com.verilag.student_details_database.models.Student;
import com.verilag.student_details_database.services.faculty.StudentFetchService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174", "http://localhost:5175"}) 
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

    // Endpoint to get the count of students under the logged-in FA
    @GetMapping("/students/count/{faId}")
    public ResponseEntity<Integer> getStudentCount(@PathVariable Long faId) {
        int count = studentService.getStudentCountByFAId(faId); 
        return ResponseEntity.ok(count);
    }
}