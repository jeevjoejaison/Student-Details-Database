package com.verilag.student_details_database.controller.formsController;

import java.io.IOException;
import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.verilag.student_details_database.models.formModels.PlacementModel;
import com.verilag.student_details_database.models.formModels.dtos.PlacementDTO;
import com.verilag.student_details_database.services.forms.PlacementService;

@RestController
@RequestMapping("/placements")
public class PlacementController {
    private final PlacementService service;

    public PlacementController(PlacementService service) {
        this.service = service;
    }

    @PostMapping(value = "/create", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> createPlacement(@ModelAttribute PlacementDTO dto) {
        try {
            service.savePlacement(dto);
            return ResponseEntity.ok("Placement record created successfully");
        } catch (IOException e) {
            return ResponseEntity.badRequest().body("Error saving placement record");
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<PlacementModel>> getAllPlacements() {
        return ResponseEntity.ok(service.getAllPlacements());
    }
}
