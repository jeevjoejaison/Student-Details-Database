package com.verilag.student_details_database.controller.formsController;

import java.io.IOException;
import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.verilag.student_details_database.models.formModels.TechnicalEventModel;
import com.verilag.student_details_database.models.formModels.dtos.TechnicalEventDto;
import com.verilag.student_details_database.services.forms.TechnicalEventsService;

@RestController
@RequestMapping("/technical-events")
public class TechnicalEventsController {

    private final TechnicalEventsService technicalEventService;

    public TechnicalEventsController(TechnicalEventsService technicalEventService) {
        this.technicalEventService = technicalEventService;
    }

    @PostMapping(value = "/create", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> createEvent(@ModelAttribute TechnicalEventDto dto) {
        try {
            
            technicalEventService.saveEvent(dto);
            return ResponseEntity.ok("Event created successfully");
        } catch (IOException e) {
            System.out.println("Error in saving Technical Event");
            e.printStackTrace();
            return ResponseEntity.status(500).body("Failed to create event");
        }
    }

    @GetMapping("/get-all")
    public ResponseEntity<List<TechnicalEventModel>> getAllEvents(@RequestParam Long studentId) {
        System.out.println(studentId);
        List<TechnicalEventModel> events = technicalEventService.getApprovedEventsForStudent(studentId);
        return ResponseEntity.ok(events);
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteActivity(@RequestParam Long activityId) {
        try {
            technicalEventService.deleteActivity(activityId);
            return ResponseEntity.ok("Activity deleted successfully.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
