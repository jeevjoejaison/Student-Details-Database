package com.verilag.student_details_database.controller.formsController;

import com.verilag.student_details_database.config.TestSecurityConfig;
import com.verilag.student_details_database.models.formModels.JournalPaper;
import com.verilag.student_details_database.models.formModels.dtos.JournalPaperDTO;
import com.verilag.student_details_database.services.forms.JournalPaperService;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(JournalPaperController.class)
@Import(TestSecurityConfig.class)
public class JournalPaperControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private JournalPaperService journalPaperService;

    // --------------------------------------------------
    // ✅ Test /journal-papers/create (POST)
    // --------------------------------------------------
    @Test
    void testCreateJournalPaper_success() throws Exception {
        mockMvc.perform(multipart("/journal-papers/create")
                .param("title", "My Paper")
                .param("journalName", "Spring Journal")
                .param("name", "Kannan")
                .param("rollNumber", "22XX1001")
                .param("studentId", "1")
                .param("author", "Dr. Who")
                .param("year", "2024")
                .param("publisher", "ACM")
                .param("issn", "12345678")
                .param("volume", "12")
                .param("issue", "1")
                .param("abstractText", "Some abstract")
                .contentType(MediaType.MULTIPART_FORM_DATA))
            .andExpect(status().isOk())
            .andExpect(content().string("Journal paper created successfully"));
    }

    // --------------------------------------------------
    // ✅ Test /journal-papers/get-all?studentId= (GET)
    // --------------------------------------------------
    @Test
    void testGetAllJournalPapersByStudent() throws Exception {
        JournalPaper paper = new JournalPaper();
        paper.setTitle("Test Title");
        paper.setStudentId(1L);

        Mockito.when(journalPaperService.getPapersByStudent(1L)).thenReturn(List.of(paper));

        mockMvc.perform(get("/journal-papers/get-all")
                .param("studentId", "1"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$", hasSize(1)))
            .andExpect(jsonPath("$[0].title").value("Test Title"));
    }

    // --------------------------------------------------
    // ✅ Test /journal-papers/delete?activityId= (DELETE)
    // --------------------------------------------------
    @Test
    void testDeleteJournalPaper_success() throws Exception {
        mockMvc.perform(delete("/journal-papers/delete")
                .param("activityId", "10"))
            .andExpect(status().isOk())
            .andExpect(content().string("Journal paper deleted successfully."));
    }

    @Test
    void testDeleteJournalPaper_notFound() throws Exception {
        Mockito.doThrow(new IllegalArgumentException("Journal Paper not found with ID: 10"))
                .when(journalPaperService).deletePaper(10L);

        mockMvc.perform(delete("/journal-papers/delete")
                .param("activityId", "10"))
            .andExpect(status().isBadRequest())
            .andExpect(content().string("Journal Paper not found with ID: 10"));
    }

    // --------------------------------------------------
    // ✅ Test /journal-papers/search?query= (GET)
    // --------------------------------------------------
    @Test
    void testSearchJournals_returnsMatchingPapers() throws Exception {
        JournalPaperDTO dto = new JournalPaperDTO();
        dto.setTitle("IEEE Transactions");
        dto.setJournalName("IEEE Journal");
        dto.setPublisher("IEEE");
        dto.setIssn("12345678");

        Mockito.when(journalPaperService.searchByName("ieee")).thenReturn(List.of(dto));

        mockMvc.perform(get("/journal-papers/search")
                .param("query", "ieee"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$[0].title").value("IEEE Transactions"))
            .andExpect(jsonPath("$[0].journalName").value("IEEE Journal"))
            .andExpect(jsonPath("$[0].publisher").value("IEEE"))
            .andExpect(jsonPath("$[0].issn").value("12345678"));
    }

    @Test
    void testSearchJournals_emptyResult() throws Exception {
        Mockito.when(journalPaperService.searchByName("unknown")).thenReturn(List.of());

        mockMvc.perform(get("/journal-papers/search")
                .param("query", "unknown"))
            .andExpect(status().isOk())
            .andExpect(content().json("[]"));
    }
}
