package com.verilag.student_details_database.repository;

import com.verilag.student_details_database.models.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.List;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    Optional<Student> findByRollNumber(String rollNumber); // Find student by roll number


    List<Student> findByDepartmentAndRollNumberStartingWith(String department, String rollNumberPrefix);
    // Find student by roll number
    // Fetch students assigned to a specific FA (Faculty Advisor)
    @Query("SELECT s FROM Student s JOIN FETCH s.fa WHERE s.fa.userId = :faId")
    List<Student> findByFaUserId(@Param("faId") Long faId);


    Student findByEmail(String email);
}