package com.verilag.student_details_database.services.faculty;

import com.verilag.student_details_database.models.formModels.Activity;
import com.verilag.student_details_database.repository.facultyRepos.PendingReqRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PendingReqService {
    private final PendingReqRepository pendingReqRepository;

    public PendingReqService(PendingReqRepository pendingReqRepository) {
        this.pendingReqRepository = pendingReqRepository;
    }

    // Fetch all pending activities for a faculty advisor
    public List<Activity> getPendingActivitiesForFA(Long faId) {
        return pendingReqRepository.findUnapprovedActivitiesByFAId(faId);
    }

    // Approve an activity by ID
    @Transactional
    public boolean approveActivity(Long activityId) {
        int updatedRows = pendingReqRepository.approveActivity(activityId);
        return updatedRows > 0; // Returns true if at least one row was updated
    }
}
