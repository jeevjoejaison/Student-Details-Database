package com.verilag.student_details_database.services;

import com.verilag.student_details_database.models.Student;
import com.verilag.student_details_database.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImp implements UserDetailsService {

    @Autowired
    private StudentRepository studentRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return studentRepository.findByEmail(email);
    }

    public Student authenticate(String email, String password) {
        Student student = studentRepository.findByEmail(email);
        if (student != null && student.checkPassword(password)) {
            return student;
        }
        return null;
    }
}
