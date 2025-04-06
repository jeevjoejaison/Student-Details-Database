package com.verilag.student_details_database.controller.formsController;

import com.verilag.student_details_database.config.TestSecurityConfig;
import com.verilag.student_details_database.models.formModels.PlacementModel;
import com.verilag.student_details_database.models.formModels.dtos.PlacementDTO;
import com.verilag.student_details_database.services.forms.PlacementService;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@Import(TestSecurityConfig.class)
@WebMvcTest(PlacementController.class)
public class PlacementControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private PlacementService placementService;

    @Test
    void testCreatePlacement() throws Exception {
        MockMultipartFile file = new MockMultipartFile("offerLetter", "offer.pdf", "application/pdf", "dummy pdf content".getBytes());

        mockMvc.perform(multipart("/placements/create")
                .file(file)
                .param("studentId", "123")
                .param("name", "John")
                .param("rollNumber", "22CS123")
                .param("type", "Placement")
                .param("company", "Infosys")
                .param("role", "SDE")
                .param("location", "Bangalore")
                .param("coreJob", "true")
                .param("joiningDate", "2024-06-01")
                .param("ctc", "12 LPA")
                .param("hiringMode", "On-Campus")
                .param("description", "Placed via on-campus drive"))
            .andExpect(status().isOk())
            .andExpect(content().string("Placement record created successfully"));

        verify(placementService, times(1)).savePlacement(any(PlacementDTO.class));
    }

    @Test
    void testGetAllPlacements() throws Exception {
        Long studentId = 123L;

        PlacementModel model1 = new PlacementModel();
        model1.setCompany("Google");
        PlacementModel model2 = new PlacementModel();
        model2.setCompany("Amazon");

        List<PlacementModel> list = Arrays.asList(model1, model2);
        when(placementService.getApprovedEventsForStudent(studentId)).thenReturn(list);

        mockMvc.perform(get("/placements/get-all")
                .param("studentId", studentId.toString()))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.size()").value(2))
            .andExpect(jsonPath("$[0].company").value("Google"))
            .andExpect(jsonPath("$[1].company").value("Amazon"));

        verify(placementService, times(1)).getApprovedEventsForStudent(studentId);
    }

    @Test
    void testDeleteActivitySuccess() throws Exception {
        Long activityId = 1L;

        mockMvc.perform(delete("/placements/delete")
                .param("activityId", activityId.toString()))
            .andExpect(status().isOk())
            .andExpect(content().string("Activity deleted successfully."));

        verify(placementService, times(1)).deleteActivity(activityId);
    }

    @Test
    void testDeleteActivityFailure() throws Exception {
        Long activityId = 99L;

        doThrow(new IllegalArgumentException("Activity not found")).when(placementService).deleteActivity(activityId);

        mockMvc.perform(delete("/placements/delete")
                .param("activityId", activityId.toString()))
            .andExpect(status().isBadRequest())
            .andExpect(content().string("Activity not found"));

        verify(placementService, times(1)).deleteActivity(activityId);
    }
}
