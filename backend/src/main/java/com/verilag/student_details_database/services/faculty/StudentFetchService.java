package com.verilag.student_details_database.services.faculty;

import org.springframework.stereotype.Service;

import com.verilag.student_details_database.models.Student;
import com.verilag.student_details_database.repository.StudentRepository;

import java.util.List;

@Service
public class StudentFetchService {
    private final StudentRepository studentRepository;

    public StudentFetchService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    // Fetch students assigned to a faculty advisor (FA)
    public List<Student> getStudentsByFAId(Long faId) {
        return studentRepository.findByFaUserId(faId);
    }

    // Count students assigned to a faculty advisor (FA)
    public int getStudentCountByFAId(Long faId) {
        return studentRepository.countByFaUserId(faId);
    }
}