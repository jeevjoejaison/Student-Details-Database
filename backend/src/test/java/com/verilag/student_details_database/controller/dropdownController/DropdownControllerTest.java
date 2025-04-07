package com.verilag.student_details_database.controller.dropdownController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.verilag.student_details_database.config.TestSecurityConfig;
import com.verilag.student_details_database.exception.GlobalExceptionHandler;
import com.verilag.student_details_database.models.dropDownModel.DropdownModel;
import com.verilag.student_details_database.models.dropDownModel.dto.DropdownDTO;
import com.verilag.student_details_database.services.dropdown.DropdownService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(DropdownController.class)
@Import({GlobalExceptionHandler.class, TestSecurityConfig.class})
public class DropdownControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private DropdownService dropdownService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void addDropdownOption_shouldReturn200_whenValidInput() throws Exception {
        DropdownDTO dto = new DropdownDTO("Category", "Awards", "Best Performer");
        DropdownModel saved = new DropdownModel("Category", "Awards", "Best Performer");

        Mockito.when(dropdownService.addDropdownOption(any())).thenReturn(saved);

        mockMvc.perform(post("/dropdown/add")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.category").value("Category"));
    }


    @Test
    void deleteDropdownOption_shouldReturn200_whenDeleted() throws Exception {
        mockMvc.perform(delete("/dropdown/delete")
                        .param("id", "1"))
                .andExpect(status().isOk())
                .andExpect(content().string("Dropdown option deleted successfully."));
    }

    @Test
    void getDropdownOptions_shouldReturn200WithList() throws Exception {
        List<DropdownModel> list = Arrays.asList(
                new DropdownModel("Category", "Award", "Best"),
                new DropdownModel("Category", "Award", "Runner Up")
        );

        Mockito.when(dropdownService.getDropdownOptions("Category", "Award")).thenReturn(list);

        mockMvc.perform(get("/dropdown/fetch")
                        .param("category", "Category")
                        .param("dropdownName", "Award"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2));
    }

    @Test
    void getDropdownOptions_shouldReturn500OnServiceError() throws Exception {
        Mockito.when(dropdownService.getDropdownOptions("Category", "Award"))
                .thenThrow(new RuntimeException("DB Error"));

        mockMvc.perform(get("/dropdown/fetch")
                        .param("category", "Category")
                        .param("dropdownName", "Award"))
                .andExpect(status().isInternalServerError());
    }
}
