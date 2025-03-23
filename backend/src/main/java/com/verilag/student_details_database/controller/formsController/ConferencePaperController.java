package com.verilag.student_details_database.controller.formsController;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.verilag.student_details_database.models.formModels.ConferencePaper;
import com.verilag.student_details_database.models.formModels.dtos.ConferencePaperDTO;
import com.verilag.student_details_database.services.forms.ConferencePaperService;

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
@RequestMapping("/conference-papers")
@CrossOrigin(origins = "http://localhost:5173")
public class ConferencePaperController {

    private final ConferencePaperService conferencePaperService;

    public ConferencePaperController(ConferencePaperService conferencePaperService) {
        this.conferencePaperService = conferencePaperService;
    }
    
    @PostMapping(value = "/create", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> createPaper(@ModelAttribute ConferencePaperDTO dto) throws IOException {
        conferencePaperService.saveConferencePaper(dto);
        return ResponseEntity.ok("Conference paper created successfully");
    }

    @GetMapping("/get-all")
    public ResponseEntity<List<ConferencePaper>> getAllPapers(@RequestParam Long studentId) {
        List<ConferencePaper> papers = conferencePaperService.getConferencePapers(studentId);
        return ResponseEntity.ok(papers);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deletePaper(@RequestParam Long activityId) {
        try {
            conferencePaperService.deletePaper(activityId);
            return ResponseEntity.ok("Conference paper deleted successfully.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/search")
    public ResponseEntity<List<ConferencePaperDTO>> searchConferences(@RequestParam String query) {
        List<ConferencePaperDTO> papers = conferencePaperService.searchByName(query);
        return ResponseEntity.ok(papers);
    }

}
