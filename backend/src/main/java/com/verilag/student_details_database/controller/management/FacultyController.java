package com.verilag.student_details_database.controller.management;
import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.verilag.student_details_database.models.FA;
import com.verilag.student_details_database.services.management.FacultyService;

@RestController
@RequestMapping("/faculties")
public class FacultyController {
    @Autowired
    private FacultyService facultyService;

    @GetMapping
    public List<FA> getAllFaculties() {
        return facultyService.getAllFaculties();
    }

    @PostMapping
    public FA createFaculty(@RequestBody FA faculty) {
        return facultyService.createFaculty(faculty);
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFaculties(@RequestParam("file") MultipartFile file) {
        try {
            facultyService.createFacultiesFromExcel(file);
            return ResponseEntity.ok("Faculties created successfully from Excel file.");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to process Excel file.");
        }
    }

    // other endpoints
}