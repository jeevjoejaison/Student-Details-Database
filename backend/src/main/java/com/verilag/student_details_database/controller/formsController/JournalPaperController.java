package com.verilag.student_details_database.controller.formsController;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.verilag.student_details_database.models.formModels.JournalPaper;
import com.verilag.student_details_database.models.formModels.dtos.JournalPaperDTO;
import com.verilag.student_details_database.services.forms.JournalPaperService;

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
@RequestMapping("/journal-papers")
@CrossOrigin(origins = "http://localhost:5173")
public class JournalPaperController {

    private final JournalPaperService journalPaperService;

    public JournalPaperController(JournalPaperService journalPaperService) {
        this.journalPaperService = journalPaperService;
    }
    
    @PostMapping(value = "/create", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> createPaper(@ModelAttribute JournalPaperDTO dto) throws IOException {
        journalPaperService.saveJournalPaper(dto);
        return ResponseEntity.ok("Journal paper created successfully");
    }

    @GetMapping("/get-all")
    public ResponseEntity<List<JournalPaper>> getAllPapers(@RequestParam Long studentId) {
        List<JournalPaper> papers = journalPaperService.getPapersByStudent(studentId);
        return ResponseEntity.ok(papers);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deletePaper(@RequestParam Long activityId) {
        try {
            journalPaperService.deletePaper(activityId);
            return ResponseEntity.ok("Journal paper deleted successfully.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/search")
    public ResponseEntity<List<JournalPaperDTO>> searchJournals(@RequestParam String query) {
        List<JournalPaperDTO> papers = journalPaperService.searchByName(query);
        return ResponseEntity.ok(papers);
    }

}
