package com.verilag.student_details_database.repository;

import com.verilag.student_details_database.models.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

    List<Student> findByDepartmentAndRollNumberStartingWith(String department, String rollNumberPrefix);
    // Find student by roll number
    Optional<Student> findByRollNumber(String rollNumber); 
    // Fetch students assigned to a specific FA (Faculty Advisor)
    @Query("SELECT s FROM Student s JOIN FETCH s.fa WHERE s.fa.userId = :faId")
    List<Student> findByFaUserId(@Param("faId") Long faId);


    @Query("SELECT s FROM Student s WHERE s.userId = (SELECT u.userId FROM User u WHERE u.email = :email)")
    Student findByEmail(String email);


    // Count students assigned to a specific FA
    @Query("SELECT COUNT(s) FROM Student s WHERE s.fa.userId = :faId")
    int countByFaUserId(@Param("faId") Long faId);
}