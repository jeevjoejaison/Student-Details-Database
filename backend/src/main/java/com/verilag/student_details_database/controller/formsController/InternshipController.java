package com.verilag.student_details_database.controller.formsController;


import java.io.IOException;
import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.verilag.student_details_database.models.formModels.CulturalEventModel;
import com.verilag.student_details_database.models.formModels.Internship;
import com.verilag.student_details_database.models.formModels.dtos.InternshipDTO;
import com.verilag.student_details_database.services.forms.InternshipService;

@RestController
@RequestMapping("/internships")
@CrossOrigin(origins = "http://localhost:5173")
public class InternshipController {
    private final InternshipService service;

    public InternshipController(InternshipService service) {
        this.service = service;
    }

    @PostMapping(value = "/create", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> createPlacement(@ModelAttribute InternshipDTO dto) {
        try {
            service.saveinternship(dto);
            return ResponseEntity.ok("Internship record created successfully");
        } catch (IOException e) {
            return ResponseEntity.badRequest().body("Error saving internship record");
        }
    }

        @GetMapping("/get-all")
    public ResponseEntity<List<Internship>> getAllEvents(@RequestParam Long studentId) {
        System.out.println(studentId);
        List<Internship> records = service.getApprovedEventsForStudent(studentId);
        return ResponseEntity.ok(records);
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteActivity(@RequestParam Long activityId) {
        try {
            service.deleteActivity(activityId);
            return ResponseEntity.ok("Activity deleted successfully.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
