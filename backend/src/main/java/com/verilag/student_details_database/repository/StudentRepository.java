package com.verilag.student_details_database.repository;

import com.verilag.student_details_database.models.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    // Find student by roll number
    Optional<Student> findByRollNumber(String rollNumber); 
    @Query("SELECT s FROM Student s WHERE s.email = :email")
    Optional<Student> findByEmail(String email);
    // Fetch students assigned to a specific FA (Faculty Advisor)
    @Query("SELECT s FROM Student s JOIN FETCH s.fa WHERE s.fa.userId = :faId")
    List<Student> findByFaUserId(@Param("faId") Long faId);
}