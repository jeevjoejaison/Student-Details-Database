package com.verilag.student_details_database.services.filter;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.verilag.student_details_database.models.FA;
import com.verilag.student_details_database.repository.FARepository;

@Service
public class FacultyFilterService {
     @Autowired
    private FARepository faRepository;

    // Get faculties by department
    public List<FA> getFacultiesByDepartment(String department) {
        return faRepository.findByFaDepartment(department);
    }
}
