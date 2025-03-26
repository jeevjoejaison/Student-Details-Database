package com.verilag.student_details_database.controller.formsController;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.verilag.student_details_database.models.formModels.CulturalEventModel;
import com.verilag.student_details_database.models.formModels.dtos.CulturalEventDTO;
import com.verilag.student_details_database.services.forms.CulturalEventService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import java.io.IOException;
import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/cultural-events")
@CrossOrigin(origins = "http://localhost:5173")
public class CulturalEventsController {

    private final CulturalEventService culturalEventService;

    public CulturalEventsController(CulturalEventService culturalEventService) {
        this.culturalEventService = culturalEventService;
    }
    
    @PostMapping(value = "/create",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> createEvent(@ModelAttribute CulturalEventDTO dto){
        try {    
            culturalEventService.saveEvent(dto);
        } catch (IOException e) {

            System.out.println("Error in saving culturaln Event");
            e.printStackTrace();
        }
        return ResponseEntity.ok("Event created successfully");
    }

    @GetMapping("/get-all")
    public ResponseEntity<List<CulturalEventModel>> getAllEvents(@RequestParam Long studentId) {
        System.out.println(studentId);
        List<CulturalEventModel> events = culturalEventService.getApprovedEventsForStudent(studentId);
        return ResponseEntity.ok(events);
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteActivity(@RequestParam Long activityId) {
        try {
            culturalEventService.deleteActivity(activityId);
            return ResponseEntity.ok("Activity deleted successfully.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    

}
