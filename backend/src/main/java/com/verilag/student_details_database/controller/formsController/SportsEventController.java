package com.verilag.student_details_database.controller.formsController;

import java.io.IOException;
import org.springframework.http.ResponseEntity;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import com.verilag.student_details_database.models.formModels.dtos.SportsEventDTO;
import com.verilag.student_details_database.services.forms.SportsEventService;

@RestController
@RequestMapping("/sports-events")
@CrossOrigin("*")
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
}
