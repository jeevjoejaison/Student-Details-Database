package com.verilag.student_details_database.controller.formsController;

import com.verilag.student_details_database.config.TestSecurityConfig;
import com.verilag.student_details_database.models.formModels.CulturalEventModel;
import com.verilag.student_details_database.services.forms.CulturalEventService;

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

@WebMvcTest(CulturalEventsController.class)
@Import(TestSecurityConfig.class)
public class CulturalEventsControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CulturalEventService culturalEventService;

    // --------------------------------------------------
    // ✅ Test /cultural-events/create (POST)
    // --------------------------------------------------
    @Test
    void testCreateCulturalEvent_success() throws Exception {
        mockMvc.perform(multipart("/cultural-events/create")
                .param("eventName", "Dance Fest")
                .param("organizer", "College Union")
                .param("level", "National")
                .param("venue", "Auditorium")
                .param("award", "First Prize")
                .param("date", "2025-03-01")
                .param("studentId", "1")
                .param("name", "Kannan")
                .param("rollNumber", "22XX1001")
                .contentType(MediaType.MULTIPART_FORM_DATA))
            .andExpect(status().isOk())
            .andExpect(content().string("Event created successfully"));
    }

    // --------------------------------------------------
    // ✅ Test /cultural-events/get-all?studentId= (GET)
    // --------------------------------------------------
    @Test
    void testGetAllCulturalEventsByStudent() throws Exception {
        CulturalEventModel event = new CulturalEventModel();
        event.setEventName("Dance Fest");
        event.setStudentId(1L);

        Mockito.when(culturalEventService.getApprovedEventsForStudent(1L)).thenReturn(List.of(event));

        mockMvc.perform(get("/cultural-events/get-all")
                .param("studentId", "1"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$", hasSize(1)))
            .andExpect(jsonPath("$[0].eventName").value("Dance Fest"));
    }

    // --------------------------------------------------
    // ✅ Test /cultural-events/delete?activityId= (DELETE)
    // --------------------------------------------------
    @Test
    void testDeleteCulturalEvent_success() throws Exception {
        mockMvc.perform(delete("/cultural-events/delete")
                .param("activityId", "10"))
            .andExpect(status().isOk())
            .andExpect(content().string("Activity deleted successfully."));
    }

    @Test
    void testDeleteCulturalEvent_notFound() throws Exception {
        Mockito.doThrow(new IllegalArgumentException("Cultural event with ID 10 not found"))
                .when(culturalEventService).deleteActivity(10L);

        mockMvc.perform(delete("/cultural-events/delete")
                .param("activityId", "10"))
            .andExpect(status().isBadRequest())
            .andExpect(content().string("Cultural event with ID 10 not found"));
    }
}
