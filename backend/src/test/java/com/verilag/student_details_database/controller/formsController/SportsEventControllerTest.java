package com.verilag.student_details_database.controller.formsController;

import com.verilag.student_details_database.config.TestSecurityConfig;
import com.verilag.student_details_database.models.formModels.SportsEventModel;
import com.verilag.student_details_database.models.formModels.dtos.SportsEventDTO;
import com.verilag.student_details_database.services.forms.SportsEventService;

import org.junit.jupiter.api.Test;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.mock.web.MockMultipartFile;

import org.springframework.test.web.servlet.MockMvc;


import java.util.Arrays;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@Import(TestSecurityConfig.class)
@WebMvcTest(SportsEventController.class)
public class SportsEventControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private SportsEventService sportsEventService;


    @Test
    void testCreateSportsEvent() throws Exception {
        // Simulate file upload
        MockMultipartFile proofFile = new MockMultipartFile("proof", "certificate.jpg", "image/jpeg", "mock file content".getBytes());

        mockMvc.perform(multipart("/sports-events/create")
                .file(proofFile)
                .param("studentId", "123")
                .param("name", "John Doe")
                .param("rollNumber", "22CS001")
                .param("type", "Sports")
                .param("eventName", "Intercollege Football")
                .param("participationType", "Team")
                .param("location", "Chennai")
                .param("date", "2024-03-10")
                .param("awards", "Winner")
                .param("description", "Annual intercollege sports meet")
                .param("proofBase64", "base64mock"))
            .andExpect(status().isOk())
            .andExpect(content().string("Sports event created successfully"));

        verify(sportsEventService, times(1)).saveEvent(any(SportsEventDTO.class));
    }

    @Test
    void testGetAllSportsEvents() throws Exception {
        Long studentId = 1L;
        SportsEventModel event1 = new SportsEventModel(); event1.setEventName("Football");
        SportsEventModel event2 = new SportsEventModel(); event2.setEventName("Cricket");

        List<SportsEventModel> eventList = Arrays.asList(event1, event2);

        when(sportsEventService.getApprovedEventsForStudent(studentId)).thenReturn(eventList);

        mockMvc.perform(get("/sports-events/get-all")
                .param("studentId", studentId.toString()))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.size()").value(2))
            .andExpect(jsonPath("$[0].eventName").value("Football"))
            .andExpect(jsonPath("$[1].eventName").value("Cricket"));

        verify(sportsEventService, times(1)).getApprovedEventsForStudent(studentId);
    }

    @Test
    void testDeleteActivitySuccess() throws Exception {
        Long activityId = 1L;

        mockMvc.perform(delete("/sports-events/delete")
                .param("activityId", activityId.toString()))
            .andExpect(status().isOk())
            .andExpect(content().string("Activity deleted successfully."));

        verify(sportsEventService, times(1)).deleteActivity(activityId);
    }

    @Test
    void testDeleteActivityFailure() throws Exception {
        Long activityId = 99L;

        doThrow(new IllegalArgumentException("Activity not found")).when(sportsEventService).deleteActivity(activityId);

        mockMvc.perform(delete("/sports-events/delete")
                .param("activityId", activityId.toString()))
            .andExpect(status().isBadRequest())
            .andExpect(content().string("Activity not found"));

        verify(sportsEventService, times(1)).deleteActivity(activityId);
    }
}
