package com.verilag.student_details_database.controller.formsController;

import org.springframework.web.bind.annotation.RequestMapping;
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
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/cultural-events")
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
    public ResponseEntity<List<CulturalEventModel>> getAllEvents() {
        return ResponseEntity.ok(culturalEventService.getAllEvents());
    }
    
    

}
