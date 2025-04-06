package com.verilag.student_details_database.controller.facultyController;

import com.verilag.student_details_database.models.formModels.Activity;
import com.verilag.student_details_database.services.faculty.PendingReqService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class PendingReqControllerTest {

    @Mock
    private PendingReqService pendingReqService;

    @InjectMocks
    private PendingReqController pendingReqController;

    @Test
    void testGetPendingActivities() {
        Long faId = 1L;
        List<Activity> mockActivities = Arrays.asList(new Activity(), new Activity());

        when(pendingReqService.getPendingActivitiesForFA(faId)).thenReturn(mockActivities);

        ResponseEntity<List<Activity>> response = pendingReqController.getPendingActivities(faId);

        assertNotNull(response.getBody());
        assertEquals(2, response.getBody().size());
        verify(pendingReqService, times(1)).getPendingActivitiesForFA(faId);
    }

    @Test
    void testGetPendingCount() {
        Long faId = 1L;
        when(pendingReqService.getPendingCountForFA(faId)).thenReturn(3);

        ResponseEntity<Integer> response = pendingReqController.getPendingCount(faId);

        assertEquals(3, response.getBody());
        verify(pendingReqService, times(1)).getPendingCountForFA(faId);
    }

    @Test
    void testApproveActivity() {
        Long activityId = 10L;
        Map<String, String> requestBody = Map.of("comments", "Good activity");
        
        when(pendingReqService.approveActivity(activityId, "Good activity")).thenReturn(true);

        ResponseEntity<String> response = pendingReqController.approveActivity(activityId, requestBody);

        assertEquals("Activity approved successfully.", response.getBody());
        verify(pendingReqService, times(1)).approveActivity(activityId, "Good activity");
    }

    @Test
    void testRejectActivity() {
        Long activityId = 15L;
        Map<String, String> requestBody = Map.of("reason", "Not relevant");

        when(pendingReqService.rejectActivity(activityId, "Not relevant")).thenReturn(true);

        ResponseEntity<String> response = pendingReqController.rejectActivity(activityId, requestBody);

        assertEquals("Activity rejected and removed successfully.", response.getBody());
        verify(pendingReqService, times(1)).rejectActivity(activityId, "Not relevant");
    }
}
