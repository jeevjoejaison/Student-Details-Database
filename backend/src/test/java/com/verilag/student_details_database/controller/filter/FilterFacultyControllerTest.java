package com.verilag.student_details_database.controller.filter;

import com.verilag.student_details_database.config.TestSecurityConfig;
import com.verilag.student_details_database.models.FA;
import com.verilag.student_details_database.services.filter.FacultyFilterService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.eq;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(FilterFacultyController.class)
@Import(TestSecurityConfig.class)
public class FilterFacultyControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private FacultyFilterService facultyService;

    @Test
    void filterFacultiesByDepartment_shouldReturnMatchingFaculties() throws Exception {
        FA fa1 = new FA("fa1@univ.edu", "password1", "CSE");
        fa1.setName("Alice");

        FA fa2 = new FA("fa2@univ.edu", "password2", "CSE");
        fa2.setName("Bob");

        List<FA> faList = Arrays.asList(fa1, fa2);
        Mockito.when(facultyService.getFacultiesByDepartment(eq("CSE"))).thenReturn(faList);

        mockMvc.perform(get("/faculties/filter")
                        .param("department", "CSE"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].email").value("fa1@univ.edu"))
                .andExpect(jsonPath("$[0].name").value("Alice"))
                .andExpect(jsonPath("$[0].faDepartment").value("CSE"))
                .andExpect(jsonPath("$[1].email").value("fa2@univ.edu"))
                .andExpect(jsonPath("$[1].name").value("Bob"))
                .andExpect(jsonPath("$[1].faDepartment").value("CSE"));
    }

    @Test
    void filterFacultiesByDepartment_shouldReturnEmptyListIfNoneMatch() throws Exception {
        Mockito.when(facultyService.getFacultiesByDepartment(eq("ECE"))).thenReturn(List.of());

        mockMvc.perform(get("/faculties/filter")
                        .param("department", "ECE"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }

    @Test
    void filterFacultiesByDepartment_shouldReturnErrorIfServiceFails() throws Exception {
        Mockito.when(facultyService.getFacultiesByDepartment(eq("CSE")))
                .thenThrow(new RuntimeException("Database error"));

        mockMvc.perform(get("/faculties/filter")
                        .param("department", "CSE"))
                .andExpect(status().isInternalServerError());
    }
}
