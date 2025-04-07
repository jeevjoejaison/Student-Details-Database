package com.verilag.student_details_database.controller.management;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.verilag.student_details_database.config.TestSecurityConfig;
import com.verilag.student_details_database.models.FA;
import com.verilag.student_details_database.models.Role;
import com.verilag.student_details_database.services.management.FacultyService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(FacultyManageController.class)
@Import(TestSecurityConfig.class)
public class FacultyManageControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private FacultyService facultyService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void getAllFaculties_shouldReturnList() throws Exception {
        FA fa = new FA("test@college.edu", "password123", "CSE");
        fa.setName("Dr. Test");
        List<FA> faList = Arrays.asList(fa);
        Mockito.when(facultyService.getAllFaculties()).thenReturn(faList);

        mockMvc.perform(get("/faculties"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].email").value("test@college.edu"))
                .andExpect(jsonPath("$[0].faDepartment").value("CSE"));
    }

    @Test
    void createFaculty_shouldReturnCreatedFaculty() throws Exception {
        FA input = new FA("john@univ.edu", "securepass", "IT");
        input.setName("John Doe");

        Mockito.when(facultyService.createFaculty(any(FA.class))).thenReturn(input);

        mockMvc.perform(post("/faculties")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(input)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value("john@univ.edu"))
                .andExpect(jsonPath("$.faDepartment").value("IT"))
                .andExpect(jsonPath("$.name").value("John Doe"));
    }

    @Test
    void uploadFaculties_shouldReturnSuccessMessage() throws Exception {
        MockMultipartFile file = new MockMultipartFile("file", "test.xlsx", "application/vnd.ms-excel", "dummy-content".getBytes());

        mockMvc.perform(multipart("/faculties/upload").file(file))
                .andExpect(status().isOk())
                .andExpect(content().string("Faculties created successfully from Excel file."));
    }

    @Test
    void uploadFaculties_shouldReturnErrorOnIOException() throws Exception {
        MockMultipartFile file = new MockMultipartFile("file", "bad.xlsx", "application/vnd.ms-excel", "data".getBytes());

        Mockito.doThrow(new java.io.IOException("Read error")).when(facultyService).createFacultiesFromExcel(any());

        mockMvc.perform(multipart("/faculties/upload").file(file))
                .andExpect(status().isInternalServerError())
                .andExpect(content().string("Failed to process Excel file."));
    }

    @Test
    void deactivateUser_shouldReturnSuccess() throws Exception {
        mockMvc.perform(post("/faculties/deactivate")
                        .param("email", "inactive@univ.edu"))
                .andExpect(status().isOk())
                .andExpect(content().string("User deactivated successfully"));
    }

    @Test
    void deactivateUser_shouldReturnBadRequest() throws Exception {
        Mockito.doThrow(new RuntimeException("User not found")).when(facultyService).deactivateUser(eq("invalid@univ.edu"));

        mockMvc.perform(post("/faculties/deactivate")
                        .param("email", "invalid@univ.edu"))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("User not found"));
    }

    @Test
    void bulkDeactivateFaculties_shouldReturnSuccess() throws Exception {
        MockMultipartFile file = new MockMultipartFile("file", "deactivate.xlsx", "application/vnd.ms-excel", "data".getBytes());

        mockMvc.perform(multipart("/faculties/bulk-deactivate").file(file))
                .andExpect(status().isOk())
                .andExpect(content().string("Bulk deactivation completed successfully"));
    }

    @Test
    void bulkDeactivateFaculties_shouldReturnIOExceptionError() throws Exception {
        MockMultipartFile file = new MockMultipartFile("file", "badfile.xlsx", "application/vnd.ms-excel", "dummy".getBytes());

        Mockito.doThrow(new java.io.IOException("Read failure")).when(facultyService).bulkDeactivateFaculties(any());

        mockMvc.perform(multipart("/faculties/bulk-deactivate").file(file))
                .andExpect(status().isInternalServerError())
                .andExpect(content().string("Error processing Excel file: Read failure"));
    }

    @Test
    void bulkDeactivateFaculties_shouldReturnGenericError() throws Exception {
        MockMultipartFile file = new MockMultipartFile("file", "faulty.xlsx", "application/vnd.ms-excel", "dummy".getBytes());

        Mockito.doThrow(new RuntimeException("Unexpected error")).when(facultyService).bulkDeactivateFaculties(any());

        mockMvc.perform(multipart("/faculties/bulk-deactivate").file(file))
                .andExpect(status().isInternalServerError())
                .andExpect(content().string("Error during bulk deactivation: Unexpected error"));
    }
}
