package com.verilag.student_details_database.services.faculty;

import com.verilag.student_details_database.models.Student;
import com.verilag.student_details_database.models.formModels.Activity;
import com.verilag.student_details_database.repository.StudentRepository;
import com.verilag.student_details_database.repository.facultyRepos.PendingReqRepository;
import com.verilag.student_details_database.services.EmailService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PendingReqService {
    private final PendingReqRepository pendingReqRepository;
    private final StudentRepository studentRepository;
    private final EmailService emailService;

    public PendingReqService(PendingReqRepository pendingReqRepository, 
                             StudentRepository studentRepository,
                             EmailService emailService) {
        this.pendingReqRepository = pendingReqRepository;
        this.studentRepository = studentRepository;
        this.emailService = emailService;
    }

    // Fetch all pending activities for a faculty advisor
    public List<Activity> getPendingActivitiesForFA(Long faId) {
        return pendingReqRepository.findUnapprovedActivitiesByFAId(faId);
    }

    // Count pending activities for a specific FA
    public int getPendingCountForFA(Long faId) {
        return pendingReqRepository.countPendingActivitiesByFAId(faId);
    }

    // Approve an activity by ID
    @Transactional
    public boolean approveActivity(Long activityId, String comments) {
        int updatedRows = pendingReqRepository.approveActivity(activityId, comments);
        return updatedRows > 0; // Returns true if at least one row was updated
    }

    // Reject an activity by ID
    @Transactional
    public boolean rejectActivity(Long activityId, String rejectionReason) {
        Activity activity = pendingReqRepository.findById(activityId).orElse(null);
        if (activity == null) {
            return false;
        }

        // ✅ Get student email
        Student student = studentRepository.findById(activity.getStudentId()).orElse(null);
        if (student == null) {
            return false;
        }
        String studentEmail = student.getEmail();

        // ✅ Send rejection email
        String subject = "Your Activity Verification Request was Rejected";
        String message = "Dear " + student.getName() + ",\n\n"
                + "Unfortunately, your activity verification request has been rejected.\n"
                + "Reason: " + rejectionReason + "\n\n"
                + "If you have any concerns, please contact your faculty advisor.\n\n"
                + "Best regards,\nYour Faculty Team";

        emailService.sendEmail(studentEmail, subject, message);

        // ✅ Remove the activity from the database
        int deletedRows = pendingReqRepository.deleteActivity(activityId);

        return deletedRows > 0; // Return true if activity was deleted
    }
}