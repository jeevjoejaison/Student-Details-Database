package com.verilag.student_details_database.controller.facultyController;

import com.verilag.student_details_database.models.formModels.Activity;
import com.verilag.student_details_database.services.faculty.PendingReqService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173") 
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

    // Endpoint to get the count of pending activities for a specific FA
    @GetMapping("/pending-activities/count/{faId}")
    public ResponseEntity<Integer> getPendingCount(@PathVariable Long faId) {
        int count = pendingReqService.getPendingCountForFA(faId); // Implement this method in your service
        return ResponseEntity.ok(count);
    }

    // Approve an activity
    @PutMapping("/approve-activity/{activityId}")
    public ResponseEntity<String> approveActivity(@PathVariable Long activityId, @RequestBody(required = false) Map<String, String> requestBody) {

        String comments = requestBody != null ? requestBody.get("comments") : null;
        boolean success = pendingReqService.approveActivity(activityId, comments);
        if (success) {
            return ResponseEntity.ok("Activity approved successfully.");
        } else {
            return ResponseEntity.badRequest().body("Activity not found or already approved.");
        }
    }


    // Reject an activity
    @DeleteMapping("/reject-activity/{activityId}")
    public ResponseEntity<String> rejectActivity(@PathVariable Long activityId, @RequestBody(required = false) Map<String, String> requestBody) {
        String rejectionReason = requestBody.get("reason");
        boolean success = pendingReqService.rejectActivity(activityId, rejectionReason);
        if (success) {
            return ResponseEntity.ok("Activity rejected and removed successfully.");
        } else {
            return ResponseEntity.badRequest().body("Activity not found or already removed.");
        }
    }
}