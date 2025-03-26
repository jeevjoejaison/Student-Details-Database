package com.verilag.student_details_database.repository.formRepos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.verilag.student_details_database.models.formModels.CulturalEventModel;

public interface CulturalEventRepository extends JpaRepository<CulturalEventModel,Long>{

    @Query("SELECT c FROM CulturalEventModel c WHERE c.studentId = :studentId AND c.approved = true")
    List<CulturalEventModel> findApprovedEventsByStudentId(@Param("studentId") Long studentId);
    void deleteByActivityId(Long activityId);
}
