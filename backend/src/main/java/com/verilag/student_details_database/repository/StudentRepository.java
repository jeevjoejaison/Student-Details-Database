package com.verilag.student_details_database.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.verilag.student_details_database.models.Student;


public interface StudentRepository extends JpaRepository<Student,String>{
    Student findByEmail(String email);
}