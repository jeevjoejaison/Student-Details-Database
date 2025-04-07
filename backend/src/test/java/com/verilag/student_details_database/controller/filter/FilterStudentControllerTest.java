package com.verilag.student_details_database.controller.filter;



import com.verilag.student_details_database.models.Student;
import com.verilag.student_details_database.services.filter.StudentFilterService;
import com.verilag.student_details_database.config.TestSecurityConfig;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;

import java.util.Collections;
import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(FilterStudentController.class)
@Import(TestSecurityConfig.class)
public class FilterStudentControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private StudentFilterService studentService;

    // 1. Success case
    @Test
    void filterStudents_shouldReturnListOfStudents() throws Exception {
        Student student = new Student();
        student.setName("John Doe");
        student.setDepartment("CSE");
        student.setRollNumber("CSE123");

        when(studentService.getStudentsByDepartmentAndRollNumberPrefix("CSE", "CSE"))
                .thenReturn(List.of(student));

        mockMvc.perform(get("/students/filter")
                        .param("department", "CSE")
                        .param("rollNumberPrefix", "CSE"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value("John Doe"))
                .andExpect(jsonPath("$[0].rollNumber").value("CSE123"));
    }

    // 2. Empty result
    @Test
    void filterStudents_shouldReturnEmptyList() throws Exception {
        when(studentService.getStudentsByDepartmentAndRollNumberPrefix("ECE", "ECE"))
                .thenReturn(Collections.emptyList());

        mockMvc.perform(get("/students/filter")
                        .param("department", "ECE")
                        .param("rollNumberPrefix", "ECE"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }

    // 3. Missing request parameters
    @Test
    void filterStudents_shouldReturnBadRequestIfParamsMissing() throws Exception {
        mockMvc.perform(get("/students/filter")
                        .param("department", "MECH")) // Missing rollNumberPrefix
                .andExpect(status().isBadRequest());
    }

    // 4. Service throws exception
    @Test
    void filterStudents_shouldHandleServiceError() throws Exception {
        when(studentService.getStudentsByDepartmentAndRollNumberPrefix("CSE", "CSE"))
                .thenThrow(new RuntimeException("Database error"));

        mockMvc.perform(get("/students/filter")
                        .param("department", "CSE")
                        .param("rollNumberPrefix", "CSE"))
                .andExpect(status().isInternalServerError());
    }

    // 5. Case-sensitive filter
    @Test
    void filterStudents_shouldRespectCaseSensitivity() throws Exception {
        Student student = new Student();
        student.setName("Alice");
        student.setDepartment("cse");
        student.setRollNumber("cse001");

        when(studentService.getStudentsByDepartmentAndRollNumberPrefix("cse", "cse"))
                .thenReturn(List.of(student));

        mockMvc.perform(get("/students/filter")
                        .param("department", "cse")
                        .param("rollNumberPrefix", "cse"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value("Alice"));
    }
}
