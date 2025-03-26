package com.verilag.student_details_database.controller.facultyController;

import com.verilag.student_details_database.models.formModels.Activity;
import com.verilag.student_details_database.services.faculty.VerifiedService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173") 
@RestController
@RequestMapping("/api/faculty")
public class VerifiedController {

    private final VerifiedService verifiedService;

    public VerifiedController(VerifiedService verifiedService) {
        this.verifiedService = verifiedService;
    }

    // Get all verified activities for students under a given FA
    @GetMapping("/verified-activities/{faId}")
    public ResponseEntity<List<Activity>> getVerifiedActivities(@PathVariable Long faId) {
        List<Activity> verifiedActivities = verifiedService.getVerifiedActivitiesForFA(faId);
        return ResponseEntity.ok(verifiedActivities);
    }

    // Endpoint to get the count of verified activities for a specific FA
    @GetMapping("/verified-activities/count/{faId}")
    public ResponseEntity<Integer> getVerifiedCount(@PathVariable Long faId) {
        int count = verifiedService.getVerifiedCountForFA(faId); // Implement this method in your service
        return ResponseEntity.ok(count);
    }
}