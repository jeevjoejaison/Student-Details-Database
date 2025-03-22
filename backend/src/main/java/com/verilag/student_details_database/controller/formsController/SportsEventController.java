package com.verilag.student_details_database.controller.formsController;

import java.io.IOException;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import com.verilag.student_details_database.models.formModels.CulturalEventModel;
import com.verilag.student_details_database.models.formModels.SportsEventModel;
import com.verilag.student_details_database.models.formModels.dtos.SportsEventDTO;
import com.verilag.student_details_database.services.forms.SportsEventService;

@RestController
@RequestMapping("/sports-events")
@CrossOrigin(origins = "http://localhost:5173")
public class SportsEventController {
    private final SportsEventService sportsEventService;

    public SportsEventController(SportsEventService sportsEventService) {
        this.sportsEventService = sportsEventService;
    }

    @PostMapping(value = "/create", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> createEvent(@ModelAttribute SportsEventDTO dto) {
        try {
            
            sportsEventService.saveEvent(dto);
        } catch (IOException e) {
            System.out.println("Error in saving Sports Event");
            e.printStackTrace();
        }
        return ResponseEntity.ok("Sports event created successfully");
    }

    @GetMapping("/get-all")
    public ResponseEntity<List<SportsEventModel>> getAllEvents(@RequestParam Long studentId) {
        System.out.println(studentId);
        List<SportsEventModel> events = sportsEventService.getApprovedEventsForStudent(studentId);
        return ResponseEntity.ok(events);
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteActivity(@RequestParam Long activityId) {
        try {
            sportsEventService.deleteActivity(activityId);
            return ResponseEntity.ok("Activity deleted successfully.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
