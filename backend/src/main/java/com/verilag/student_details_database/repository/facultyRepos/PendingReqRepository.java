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
    @Query(value = "SELECT a.* FROM activity a " +
                   "WHERE a.student_id IN (SELECT s.user_id FROM student s WHERE s.fa_id = :faId) " +
                   "AND a.approved = false", nativeQuery = true)
    List<Activity> findUnapprovedActivitiesByFAId(@Param("faId") Long faId);

    // Approve a specific activity by setting approved = true
    @Transactional
    @Modifying
    @Query("UPDATE Activity a SET a.approved = true WHERE a.activityId = :activityId")
    int approveActivity(@Param("activityId") Long activityId);
}
