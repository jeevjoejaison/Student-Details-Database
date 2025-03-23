package com.verilag.student_details_database.repository.formRepos;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.verilag.student_details_database.models.formModels.ConferencePaper;

public interface ConferencePaperRepository extends JpaRepository<ConferencePaper, Long> {

    @Query("SELECT c FROM ConferencePaper c WHERE c.studentId = :studentId")
    List<ConferencePaper> findByStudentId(@Param("studentId") Long studentId);

    void deleteByActivityId(Long activityId);

    List<ConferencePaper> findByConferenceNameContainingIgnoreCase(String conferenceName);

}
