package com.verilag.student_details_database.repository.facultyRepos;

import com.verilag.student_details_database.models.formModels.Activity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VerifiedRepository extends JpaRepository<Activity, Long> {
    
    // Fetch all verified activities of students under a specific FA
    @Query("SELECT a FROM Activity a WHERE a.studentId IN " +
            "(SELECT s.userId FROM Student s WHERE s.fa.userId = :faId) " +
            "AND a.approved = true")
    List<Activity> findApprovedActivitiesByFAId(@Param("faId") Long faId);

    // Count verified activities for a specific FA
    @Query("SELECT COUNT(a) FROM Activity a WHERE a.studentId IN " +
            "(SELECT s.userId FROM Student s WHERE s.fa.userId = :faId) " +
            "AND a.approved = true")
    int countVerifiedActivitiesByFAId(@Param("faId") Long faId);
}