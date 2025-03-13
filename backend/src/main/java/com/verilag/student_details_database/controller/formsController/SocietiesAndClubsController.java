package com.verilag.student_details_database.controller.formsController;

import java.io.IOException;
import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.verilag.student_details_database.models.formModels.SocietiesAndClubsModel;
import com.verilag.student_details_database.models.formModels.dtos.SocietiesAndClubsDTO;
import com.verilag.student_details_database.services.forms.SocietiesAndClubsService;

@RestController
@RequestMapping("/societies-clubs")
public class SocietiesAndClubsController {
    private final SocietiesAndClubsService service;

    public SocietiesAndClubsController(SocietiesAndClubsService service) {
        this.service = service;
    }

    @PostMapping(value = "/create", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> createSocietyOrClub(@ModelAttribute SocietiesAndClubsDTO dto) {
        try {
            service.saveSocietyOrClub(dto);
            return ResponseEntity.ok("Society/Club created successfully");
        } catch (IOException e) {
            return ResponseEntity.badRequest().body("Error saving society/club");
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<SocietiesAndClubsModel>> getAllSocietiesAndClubs() {
        return ResponseEntity.ok(service.getAllSocietiesAndClubs());
    }
}
