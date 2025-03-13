package com.verilag.student_details_database.controller.formsController;


import java.io.IOException;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.verilag.student_details_database.models.formModels.dtos.InternshipDTO;
import com.verilag.student_details_database.services.forms.InternshipService;

@RestController
@RequestMapping("/internships")
public class InternshipController {
    private final InternshipService service;

    public InternshipController(InternshipService service) {
        this.service = service;
    }

    @PostMapping(value = "/create", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> createPlacement(@ModelAttribute InternshipDTO dto) {
        try {
            service.saveinternship(dto);
            return ResponseEntity.ok("Placement record created successfully");
        } catch (IOException e) {
            return ResponseEntity.badRequest().body("Error saving placement record");
        }
    }

}
