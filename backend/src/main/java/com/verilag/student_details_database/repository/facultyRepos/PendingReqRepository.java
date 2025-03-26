package com.verilag.student_details_database.repository.facultyRepos;

import com.verilag.student_details_database.models.formModels.Activity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface PendingReqRepository extends JpaRepository<Activity, Long> {

    // Fetch all unapproved activities of students under a specific FA
    @Query("SELECT a FROM Activity a WHERE a.studentId IN " +
       "(SELECT s.userId FROM Student s WHERE s.fa.userId = :faId) " +
       "AND a.approved = false")
    List<Activity> findUnapprovedActivitiesByFAId(@Param("faId") Long faId);

    // Approve a specific activity by setting approved = true
    @Transactional
    @Modifying
    @Query("UPDATE Activity a SET a.approved = true, a.comments = :comments WHERE a.activityId = :activityId")
    int approveActivity(@Param("activityId") Long activityId, @Param("comments") String comments);

    // Reject an activity by deleting it
    @Transactional
    @Modifying
    @Query("DELETE FROM Activity a WHERE a.activityId = :activityId")
    int deleteActivity(@Param("activityId") Long activityId);

    // Count pending activities for a specific FA
    @Query("SELECT COUNT(a) FROM Activity a WHERE a.studentId IN " +
           "(SELECT s.userId FROM Student s WHERE s.fa.userId = :faId) " +
           "AND a.approved = false")
    int countPendingActivitiesByFAId(@Param("faId") Long faId);
}