package com.verilag.student_details_database.repository.formRepos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.verilag.student_details_database.models.formModels.CulturalEventModel;
import com.verilag.student_details_database.models.formModels.Internship;

public interface InternshipRepository extends JpaRepository<Internship,Long> {
    @Query("SELECT c FROM Internship c WHERE c.studentId = :studentId AND c.approved = false")
    List<Internship> findApprovedEventsByStudentId(@Param("studentId") Long studentId);
    void deleteByActivityId(Long activityId);
}
