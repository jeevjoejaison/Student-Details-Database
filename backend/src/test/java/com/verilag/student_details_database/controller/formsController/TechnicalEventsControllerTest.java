package com.verilag.student_details_database.controller.formsController;

import com.verilag.student_details_database.config.TestSecurityConfig;
import com.verilag.student_details_database.models.formModels.TechnicalEventModel;
import com.verilag.student_details_database.services.forms.TechnicalEventsService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;

import java.io.IOException;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@Import(TestSecurityConfig.class)
@WebMvcTest(TechnicalEventsController.class)
public class TechnicalEventsControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private TechnicalEventsService technicalEventsService;


    @Test
    public void testCreateEvent() throws Exception {
        MockMultipartFile file = new MockMultipartFile("proof", "proof.pdf", "application/pdf", "dummy-data".getBytes());

        mockMvc.perform(multipart("/technical-events/create")
                .file(file)
                .param("studentId", "1")
                .param("name", "Kannan")
                .param("rollNumber", "21CSR123")
                .param("type", "Technical")
                .param("eventName", "CodeFest")
                .param("category", "Hackathon")
                .param("location", "Chennai")
                .param("date", "2024-02-01")
                .param("awards", "First Prize")
                .param("description", "Participated in CodeFest 2024")
                .contentType(MediaType.MULTIPART_FORM_DATA))
            .andExpect(status().isOk())
            .andExpect(content().string("Event created successfully"));
    }

    @Test
    public void testCreateEventIOException() throws Exception {
        Mockito.doThrow(new IOException("Failed")).when(technicalEventsService).saveEvent(any());

        mockMvc.perform(multipart("/technical-events/create")
                .param("studentId", "1")
                .param("name", "Kannan")
                .param("rollNumber", "21CSR123")
                .param("type", "Technical")
                .param("eventName", "CodeFest")
                .param("category", "Hackathon")
                .param("location", "Chennai")
                .param("date", "2024-02-01")
                .param("awards", "First Prize")
                .param("description", "Error simulation"))
            .andExpect(status().isInternalServerError())
            .andExpect(content().string("Failed to create event"));
    }

    @Test
    public void testGetAllEvents() throws Exception {
        TechnicalEventModel event = new TechnicalEventModel();
        event.setEventName("CodeFest");
        event.setStudentId(1L);

        Mockito.when(technicalEventsService.getApprovedEventsForStudent(1L))
                .thenReturn(List.of(event));

        mockMvc.perform(get("/technical-events/get-all").param("studentId", "1"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$[0].eventName").value("CodeFest"));
    }

    @Test
    public void testDeleteActivitySuccess() throws Exception {
        mockMvc.perform(delete("/technical-events/delete").param("activityId", "78"))
            .andExpect(status().isOk())
            .andExpect(content().string("Activity deleted successfully."));
    }

    @Test
    public void testDeleteActivityNotFound() throws Exception {
        Mockito.doThrow(new IllegalArgumentException("Activity not found with ID: 999"))
                .when(technicalEventsService).deleteActivity(999L);

        mockMvc.perform(delete("/technical-events/delete").param("activityId", "999"))
            .andExpect(status().isBadRequest())
            .andExpect(content().string("Activity not found with ID: 999"));
    }
}
