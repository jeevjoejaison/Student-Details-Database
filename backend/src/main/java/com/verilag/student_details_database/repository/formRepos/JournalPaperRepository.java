package com.verilag.student_details_database.repository.formRepos;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.verilag.student_details_database.models.formModels.JournalPaper;

public interface JournalPaperRepository extends JpaRepository<JournalPaper, Long> {

    @Query("SELECT j FROM JournalPaper j WHERE j.studentId = :studentId")
    List<JournalPaper> findByStudentId(@Param("studentId") Long studentId);
    
    void deleteByActivityId(Long activityId);

    List<JournalPaper> findByJournalNameContainingIgnoreCase(String journalName);
}
