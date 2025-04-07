package com.verilag.student_details_database.controller.facultyController;

import com.verilag.student_details_database.config.TestSecurityConfig;
import com.verilag.student_details_database.models.Student;
import com.verilag.student_details_database.services.faculty.StudentFetchService;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(FacultyController.class)
@Import(TestSecurityConfig.class)
public class FacultyControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private StudentFetchService studentService;

    // --------------------------------------------------
    // ✅ Test /api/faculty/students/{faId} (GET)
    // --------------------------------------------------
    @Test
    void testGetStudentsUnderFA_success() throws Exception {
        Student student1 = new Student();
        student1.setName("John");
        student1.setRollNumber("22XX1001");

        Student student2 = new Student();
        student2.setName("Jane");
        student2.setRollNumber("22XX1002");

        Mockito.when(studentService.getStudentsByFAId(10L)).thenReturn(List.of(student1, student2));

        mockMvc.perform(get("/api/faculty/students/10"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$", hasSize(2)))
            .andExpect(jsonPath("$[0].name").value("John"))
            .andExpect(jsonPath("$[1].name").value("Jane"));
    }

    // --------------------------------------------------
    // ✅ Test /api/faculty/students/count/{faId} (GET)
    // --------------------------------------------------
    @Test
    void testGetStudentCountByFA_success() throws Exception {
        Mockito.when(studentService.getStudentCountByFAId(10L)).thenReturn(2);

        mockMvc.perform(get("/api/faculty/students/count/10"))
            .andExpect(status().isOk())
            .andExpect(content().string("2"));
    }
}