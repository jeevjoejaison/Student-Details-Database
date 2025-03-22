package com.verilag.student_details_database.repository.formRepos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.verilag.student_details_database.models.formModels.SocietiesAndClubsModel;

public interface SocietiesAndClubsRepository extends JpaRepository<SocietiesAndClubsModel, Long> {

    @Query("SELECT c FROM SocietiesAndClubsModel c WHERE c.studentId = :studentId AND c.approved = false")
    List<SocietiesAndClubsModel> findApprovedEventsByStudentId(@Param("studentId") Long studentId);
    void deleteByActivityId(Long activityId);

}
