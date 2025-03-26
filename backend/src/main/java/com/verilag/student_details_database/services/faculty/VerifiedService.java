package com.verilag.student_details_database.services.faculty;

import com.verilag.student_details_database.models.formModels.Activity;
import com.verilag.student_details_database.repository.facultyRepos.VerifiedRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VerifiedService {
    private final VerifiedRepository verifiedRepository;

    public VerifiedService(VerifiedRepository verifiedRepository) {
        this.verifiedRepository = verifiedRepository;
    }

    // Fetch all verified activities for a faculty advisor
    public List<Activity> getVerifiedActivitiesForFA(Long faId) {
        return verifiedRepository.findApprovedActivitiesByFAId(faId);
    }

    // Count verified activities for a specific FA
    public int getVerifiedCountForFA(Long faId) {
        return verifiedRepository.countVerifiedActivitiesByFAId(faId);
    }
}