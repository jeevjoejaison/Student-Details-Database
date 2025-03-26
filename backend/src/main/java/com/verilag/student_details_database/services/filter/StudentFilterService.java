package com.verilag.student_details_database.services.filter;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.verilag.student_details_database.models.Student;
import com.verilag.student_details_database.repository.StudentRepository;

@Service
public class StudentFilterService {
    @Autowired
    private StudentRepository studentRepository;

    public List<Student> getStudentsByDepartmentAndRollNumberPrefix(String department, String rollNumberPrefix) {
        int year = getYearFromRollNumberPrefix(rollNumberPrefix);
        System.out.println("IN SERVICE");
        return studentRepository.findByDepartmentAndRollNumberStartingWith(department, rollNumberPrefix);
    }

    private int getYearFromRollNumberPrefix(String rollNumberPrefix) {
        switch (rollNumberPrefix) {
            case "B21":
                return 4;
            case "B22":
                return 3;
            case "B23":
                return 2;
            case "B24":
                return 1;
            default:
                throw new IllegalArgumentException("Invalid roll number prefix");
        }
    }
    

    
}
