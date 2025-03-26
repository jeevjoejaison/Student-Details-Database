package com.verilag.student_details_database.repository.externalrepo;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.verilag.student_details_database.models.externalrepo.FacultyConferencePaper;

public interface FacultyConferencePaperRepository extends JpaRepository<FacultyConferencePaper, Long> {

    List<FacultyConferencePaper> findByConferenceNameContainingIgnoreCase(String conferenceName);
}
