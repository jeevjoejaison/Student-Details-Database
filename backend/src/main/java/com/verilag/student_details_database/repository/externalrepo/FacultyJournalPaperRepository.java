package com.verilag.student_details_database.repository.externalrepo;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.verilag.student_details_database.models.externalrepo.FacultyJournalPaper;

public interface FacultyJournalPaperRepository extends JpaRepository<FacultyJournalPaper, Long> {

    List<FacultyJournalPaper> findByTitleContainingIgnoreCase(String title);
}
