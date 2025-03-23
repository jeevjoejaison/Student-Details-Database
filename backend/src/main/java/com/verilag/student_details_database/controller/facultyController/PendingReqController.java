package com.verilag.student_details_database.controller.facultyController;

import com.verilag.student_details_database.models.formModels.Activity;
import com.verilag.student_details_database.services.faculty.PendingReqService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/faculty")
public class PendingReqController {
    private final PendingReqService pendingReqService;

    public PendingReqController(PendingReqService activityService) {
        this.pendingReqService = activityService;
    }

    // Get all pending (unapproved) activities for students under a given FA
    @GetMapping("/pending-activities/{faId}")
    public ResponseEntity<List<Activity>> getPendingActivities(@PathVariable Long faId) {
        List<Activity> pendingActivities = pendingReqService.getPendingActivitiesForFA(faId);
        return ResponseEntity.ok(pendingActivities);
    }

    // Approve an activity
    @PutMapping("/approve-activity/{activityId}")
    public ResponseEntity<String> approveActivity(@PathVariable Long activityId) {
        boolean success = pendingReqService.approveActivity(activityId);
        if (success) {
            return ResponseEntity.ok("Activity approved successfully.");
        } else {
            return ResponseEntity.badRequest().body("Activity not found or already approved.");
        }
    }
}
