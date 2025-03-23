package com.verilag.student_details_database.controller.filter;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.verilag.student_details_database.models.FA;
import com.verilag.student_details_database.services.filter.FacultyFilterService;
import com.verilag.student_details_database.services.management.FacultyService;

@RestController
@RequestMapping("/faculties")
public class FilterFacultyController {
    
    @Autowired
    private FacultyFilterService facultyService;

    // Endpoint to filter faculties by department
    @GetMapping("/filter")
    public List<FA> filterFacultiesByDepartment(@RequestParam String department) {
        return facultyService.getFacultiesByDepartment(department);
    }
}
