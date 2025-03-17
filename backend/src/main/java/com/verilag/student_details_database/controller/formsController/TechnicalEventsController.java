package com.verilag.student_details_database.controller.formsController;

import java.io.IOException;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
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
}
