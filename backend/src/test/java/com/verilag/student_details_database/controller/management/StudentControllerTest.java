package com.verilag.student_details_database.controller.management;



import com.fasterxml.jackson.databind.ObjectMapper;
import com.verilag.student_details_database.config.TestSecurityConfig;
import com.verilag.student_details_database.models.Student;
import com.verilag.student_details_database.services.management.StudentServices;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(StudentController.class)
@Import(TestSecurityConfig.class)
public class StudentControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private StudentServices studentService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void getAllStudents_shouldReturnListOfStudents() throws Exception {
        Student student = new Student();
        student.setEmail("test@student.com");
        Mockito.when(studentService.getAllStudents()).thenReturn(List.of(student));

        mockMvc.perform(get("/students/get-all"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].email").value("test@student.com"));
    }

    @Test
    void createStudent_shouldReturnCreatedStudent() throws Exception {
        Student student = new Student();
        student.setEmail("student@example.com");
        student.setPassword("password123");
        Mockito.when(studentService.createStudent(any(Student.class))).thenReturn(student);

        mockMvc.perform(post("/students")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(student)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value("student@example.com"));
    }

    @Test
    void uploadStudents_shouldReturnSuccessMessage() throws Exception {
        MockMultipartFile file = new MockMultipartFile("file", "students.xlsx", "application/vnd.ms-excel", "data".getBytes());

        mockMvc.perform(multipart("/students/upload").file(file))
                .andExpect(status().isOk())
                .andExpect(content().string("Students created successfully from Excel file."));
    }

    @Test
    void deactivateStudent_shouldReturnSuccessMessage() throws Exception {
        Mockito.doNothing().when(studentService).deactivateStudent(eq("student@uni.com"));

        mockMvc.perform(post("/students/deactivate")
                        .param("email", "student@uni.com"))
                .andExpect(status().isOk())
                .andExpect(content().string("Student deactivated successfully"));
    }

    @Test
    void bulkDeactivateStudents_shouldReturnSuccessMessage() throws Exception {
        MockMultipartFile file = new MockMultipartFile("file", "bulk.xlsx", "application/vnd.ms-excel", "data".getBytes());

        mockMvc.perform(multipart("/students/bulk-deactivate").file(file))
                .andExpect(status().isOk())
                .andExpect(content().string("Bulk deactivation completed successfully"));
    }
}
