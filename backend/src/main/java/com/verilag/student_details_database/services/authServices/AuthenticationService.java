package com.verilag.student_details_database.services;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.verilag.student_details_database.models.Student;
import com.verilag.student_details_database.models.authModels.AuthenticationResponse;
import com.verilag.student_details_database.repository.StudentRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final StudentRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse login(Student request) {
        System.out.println(request.getEmail());
        System.out.println(request.getPassword());
        
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.getEmail(),
                request.getPassword()
            )
        );
        
        Student student = repository.findByEmail(request.getEmail());
        
        if (student == null) {
            throw new IllegalArgumentException("User not found");
        }

        String token = jwtService.generateToken(student);
        return new AuthenticationResponse(token);
    }
}
