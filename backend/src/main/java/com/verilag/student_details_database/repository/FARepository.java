package com.verilag.student_details_database.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.verilag.student_details_database.models.FA;

@Repository
public interface FARepository extends JpaRepository<FA, Long> {
    Optional<FA> findByEmail(String email); // Find FA by email

    List<FA> findByFaDepartment(String faDepartment);
}
