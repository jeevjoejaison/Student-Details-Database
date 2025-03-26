package com.verilag.student_details_database.repository.formRepos;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.verilag.student_details_database.models.formModels.TechnicalEventModel;

@Repository
public interface TechnicalEventRepository extends JpaRepository<TechnicalEventModel, Long> {
    @Query("SELECT c FROM TechnicalEventModel c WHERE c.studentId = :studentId AND c.approved = true")
    List<TechnicalEventModel> findApprovedEventsByStudentId(@Param("studentId") Long studentId);
    void deleteByActivityId(Long activityId);
}
