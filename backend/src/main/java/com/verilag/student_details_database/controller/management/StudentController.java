package com.verilag.student_details_database.controller.management;
import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.verilag.student_details_database.models.Student;
import com.verilag.student_details_database.services.management.StudentServices;

@RestController
@RequestMapping("/students")
@CrossOrigin(origins = "http://localhost:5173")
public class StudentController {
    @Autowired
    private StudentServices studentService;

    @GetMapping
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }

    @PostMapping
    public Student createStudent(@RequestBody Student student) {
        return studentService.createStudent(student);
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadStudents(@RequestParam("file") MultipartFile file) {
        try {
            System.out.println("IN CONTROLLER");
            studentService.createStudentsFromExcel(file);
            return ResponseEntity.ok("Students created successfully from Excel file.");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to process Excel file.");
        }
    }
    @PostMapping("/deactivate")
    public ResponseEntity<String> deactivateStudent(@RequestParam String email) {
        try {
            studentService.deactivateStudent(email);
            return ResponseEntity.ok("Student deactivated successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/bulk-deactivate")
public ResponseEntity<String> bulkDeactivateStudents(@RequestParam("file") MultipartFile file) {
    try {
        studentService.bulkDeactivateStudents(file);
        return ResponseEntity.ok("Bulk deactivation completed successfully");
    } catch (IOException e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error processing Excel file: " + e.getMessage());
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error during bulk deactivation: " + e.getMessage());
    }
}
}