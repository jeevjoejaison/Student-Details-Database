package com.verilag.student_details_database.controller.facultyController;

import com.verilag.student_details_database.models.FA;
import com.verilag.student_details_database.models.Student;
import com.verilag.student_details_database.services.faculty.StudentFetchService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class FacultyControllerTest {

    @Mock
    private StudentFetchService studentService;

    @InjectMocks
    private FacultyController facultyController;

    private FA testFA;
    private Student student1, student2;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        // Creating a dummy FA object
        testFA = new FA();
        testFA.setUserId(1L);

        // Creating two Student objects
        student1 = new Student("student1@example.com", "password", "S001", "John Doe", "CSE", "A", testFA);
        student2 = new Student("student2@example.com", "password", "S002", "Jane Doe", "ECE", "B", testFA);
    }

    @Test
    void testGetStudentsUnderFA() {
        Long faId = 1L;
        List<Student> studentsList = Arrays.asList(student1, student2);

        when(studentService.getStudentsByFAId(faId)).thenReturn(studentsList);

        ResponseEntity<List<Student>> response = facultyController.getStudentsUnderFA(faId);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(2, response.getBody().size());
        assertEquals("John Doe", response.getBody().get(0).getName());
        assertEquals("Jane Doe", response.getBody().get(1).getName());

        verify(studentService, times(1)).getStudentsByFAId(faId);
    }

    @Test
    void testGetStudentCount() {
        Long faId = 1L;
        when(studentService.getStudentCountByFAId(faId)).thenReturn(5);

        ResponseEntity<Integer> response = facultyController.getStudentCount(faId);

        assertEquals(5, response.getBody());
        verify(studentService, times(1)).getStudentCountByFAId(faId);
    }
}
