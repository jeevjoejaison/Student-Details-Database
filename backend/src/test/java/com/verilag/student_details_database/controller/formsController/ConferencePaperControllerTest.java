package com.verilag.student_details_database.controller.formsController;

import com.verilag.student_details_database.config.TestSecurityConfig;
import com.verilag.student_details_database.models.formModels.ConferencePaper;
import com.verilag.student_details_database.models.formModels.dtos.ConferencePaperDTO;
import com.verilag.student_details_database.services.forms.ConferencePaperService;

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

@WebMvcTest(ConferencePaperController.class)
@Import(TestSecurityConfig.class)
public class ConferencePaperControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ConferencePaperService conferencePaperService;

    // --------------------------------------------------
    // ✅ Test /conference-papers/create (POST)
    // --------------------------------------------------
    @Test
    void testCreateConferencePaper_success() throws Exception {
        mockMvc.perform(multipart("/conference-papers/create")
                .param("title", "AI in Education")
                .param("conferenceName", "ICICT 2025")
                .param("location", "Chennai")
                .param("organizer", "IEEE")
                .param("acceptanceRate", "25.5")
                .param("startDate", "2025-01-15")
                .param("endDate", "2025-01-17")
                .param("doi", "10.1234/icict.2025.001")
                .param("url", "https://example.com/doi")
                .param("abstractText", "Exploring AI in education")
                .param("description", "Full paper presentation")
                .param("author", "Dr. Smith")
                .param("year", "2025")
                .param("name", "Kannan")
                .param("rollNumber", "22XX1001")
                .param("studentId", "1")
                .contentType(MediaType.MULTIPART_FORM_DATA))
            .andExpect(status().isOk())
            .andExpect(content().string("Conference paper created successfully"));
    }

    // --------------------------------------------------
    // ✅ Test /conference-papers/get-all?studentId= (GET)
    // --------------------------------------------------
    @Test
    void testGetAllConferencePapersByStudent() throws Exception {
        ConferencePaper paper = new ConferencePaper();
        paper.setTitle("AI in Education");
        paper.setStudentId(1L);

        Mockito.when(conferencePaperService.getConferencePapers(1L)).thenReturn(List.of(paper));

        mockMvc.perform(get("/conference-papers/get-all")
                .param("studentId", "1"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$", hasSize(1)))
            .andExpect(jsonPath("$[0].title").value("AI in Education"));
    }

    // --------------------------------------------------
    // ✅ Test /conference-papers/delete?activityId= (DELETE)
    // --------------------------------------------------
    @Test
    void testDeleteConferencePaper_success() throws Exception {
        mockMvc.perform(delete("/conference-papers/delete")
                .param("activityId", "5"))
            .andExpect(status().isOk())
            .andExpect(content().string("Conference paper deleted successfully."));
    }

    @Test
    void testDeleteConferencePaper_notFound() throws Exception {
        Mockito.doThrow(new IllegalArgumentException("Conference paper with ID 5 not found."))
                .when(conferencePaperService).deletePaper(5L);

        mockMvc.perform(delete("/conference-papers/delete")
                .param("activityId", "5"))
            .andExpect(status().isBadRequest())
            .andExpect(content().string("Conference paper with ID 5 not found."));
    }

    // --------------------------------------------------
    // ✅ Test /conference-papers/search?query= (GET)
    // --------------------------------------------------
    @Test
    void testSearchConferences_returnsMatching() throws Exception {
        ConferencePaperDTO dto = new ConferencePaperDTO();
        dto.setTitle("AI in Education");
        dto.setConferenceName("ICICT 2025");
        dto.setLocation("Chennai");
        dto.setOrganizer("IEEE");

        Mockito.when(conferencePaperService.searchByName("icict")).thenReturn(List.of(dto));

        mockMvc.perform(get("/conference-papers/search")
                .param("query", "icict"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$[0].title").value("AI in Education"))
            .andExpect(jsonPath("$[0].conferenceName").value("ICICT 2025"))
            .andExpect(jsonPath("$[0].location").value("Chennai"))
            .andExpect(jsonPath("$[0].organizer").value("IEEE"));
    }

    @Test
    void testSearchConferences_emptyResult() throws Exception {
        Mockito.when(conferencePaperService.searchByName("unknown")).thenReturn(List.of());

        mockMvc.perform(get("/conference-papers/search")
                .param("query", "unknown"))
            .andExpect(status().isOk())
            .andExpect(content().json("[]"));
    }
}
