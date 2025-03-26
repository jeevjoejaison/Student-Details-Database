package com.verilag.student_details_database.controller.filter;

import com.verilag.student_details_database.services.filter.StudentFilterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/students")
public class FilterStudentController {

    @Autowired
    private StudentFilterService studentService;

    @GetMapping("/filter")
    public List<com.verilag.student_details_database.models.Student> filterStudents(
            @RequestParam String department,
            @RequestParam String rollNumberPrefix) {
        return studentService.getStudentsByDepartmentAndRollNumberPrefix(department, rollNumberPrefix);
    }
}