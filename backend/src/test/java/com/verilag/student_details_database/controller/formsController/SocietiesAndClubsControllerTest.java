package com.verilag.student_details_database.controller.formsController;

import com.verilag.student_details_database.config.TestSecurityConfig;
import com.verilag.student_details_database.models.formModels.SocietiesAndClubsModel;
import com.verilag.student_details_database.models.formModels.dtos.SocietiesAndClubsDTO;
import com.verilag.student_details_database.services.forms.SocietiesAndClubsService;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

import static org.mockito.Mockito.*;
import static org.mockito.ArgumentMatchers.any;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@Import(TestSecurityConfig.class)
@WebMvcTest(SocietiesAndClubsController.class)
public class SocietiesAndClubsControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private SocietiesAndClubsService service;

    @Test
    void testCreateSocietyOrClub() throws Exception {
        MockMultipartFile proofFile = new MockMultipartFile("proof", "proof.jpg", "image/jpeg", "dummy content".getBytes());

        mockMvc.perform(multipart("/societies-clubs/create")
                .file(proofFile)
                .param("studentId", "1")
                .param("name", "Jane Doe")
                .param("rollNumber", "22CS123")
                .param("type", "Club")
                .param("societyOrClubname", "Coding Club")
                .param("category", "Technical")
                .param("membershipType", "Member")
                .param("proofBase64", "base64mock"))
            .andExpect(status().isOk())
            .andExpect(content().string("Society/Club created successfully"));

        verify(service, times(1)).saveSocietyOrClub(any(SocietiesAndClubsDTO.class));
    }

    @Test
    void testGetAllSocietiesAndClubs() throws Exception {
        Long studentId = 1L;
        SocietiesAndClubsModel record1 = new SocietiesAndClubsModel();
        record1.setSocietyOrClubName("Robotics Club");

        SocietiesAndClubsModel record2 = new SocietiesAndClubsModel();
        record2.setSocietyOrClubName("Literary Society");

        List<SocietiesAndClubsModel> records = Arrays.asList(record1, record2);
        when(service.getApprovedEventsForStudent(studentId)).thenReturn(records);

        mockMvc.perform(get("/societies-clubs/get-all")
                .param("studentId", studentId.toString()))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.size()").value(2))
            .andExpect(jsonPath("$[0].societyOrClubName").value("Robotics Club"))
            .andExpect(jsonPath("$[1].societyOrClubName").value("Literary Society"));

        verify(service, times(1)).getApprovedEventsForStudent(studentId);
    }

    @Test
    void testDeleteActivitySuccess() throws Exception {
        Long activityId = 5L;

        mockMvc.perform(delete("/societies-clubs/delete")
                .param("activityId", activityId.toString()))
            .andExpect(status().isOk())
            .andExpect(content().string("Activity deleted successfully."));

        verify(service, times(1)).deleteActivity(activityId);
    }

    @Test
    void testDeleteActivityFailure() throws Exception {
        Long activityId = 99L;

        doThrow(new IllegalArgumentException("Activity not found")).when(service).deleteActivity(activityId);

        mockMvc.perform(delete("/societies-clubs/delete")
                .param("activityId", activityId.toString()))
            .andExpect(status().isBadRequest())
            .andExpect(content().string("Activity not found"));

        verify(service, times(1)).deleteActivity(activityId);
    }
}
