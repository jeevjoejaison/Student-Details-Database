package com.verilag.student_details_database.controller.facultyController;

import com.verilag.student_details_database.models.formModels.Activity;
import com.verilag.student_details_database.services.faculty.VerifiedService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class VerifiedControllerTest {

    @Mock
    private VerifiedService verifiedService;

    @InjectMocks
    private VerifiedController verifiedController;

    @Test
    void testGetVerifiedActivities() {
        Long faId = 1L;
        List<Activity> mockActivities = Arrays.asList(new Activity(), new Activity());

        when(verifiedService.getVerifiedActivitiesForFA(faId)).thenReturn(mockActivities);

        ResponseEntity<List<Activity>> response = verifiedController.getVerifiedActivities(faId);

        assertNotNull(response.getBody());
        assertEquals(2, response.getBody().size());
        verify(verifiedService, times(1)).getVerifiedActivitiesForFA(faId);
    }

    @Test
    void testGetVerifiedCount() {
        Long faId = 1L;
        when(verifiedService.getVerifiedCountForFA(faId)).thenReturn(4);

        ResponseEntity<Integer> response = verifiedController.getVerifiedCount(faId);

        assertEquals(4, response.getBody());
        verify(verifiedService, times(1)).getVerifiedCountForFA(faId);
    }
}
