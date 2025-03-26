package com.verilag.student_details_database.repository.formRepos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.verilag.student_details_database.models.formModels.PlacementModel;

public interface PlacementRepository extends JpaRepository<PlacementModel, Long> {
    @Query("SELECT c FROM PlacementModel c WHERE c.studentId = :studentId AND c.approved = true")
    List<PlacementModel> findApprovedEventsByStudentId(@Param("studentId") Long studentId);
    void deleteByActivityId(Long activityId);
}
