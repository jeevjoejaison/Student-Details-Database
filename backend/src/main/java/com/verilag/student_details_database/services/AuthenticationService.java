package com.verilag.student_details_database.services;

import java.util.Optional;

import org.springframework.boot.autoconfigure.security.oauth2.client.OAuth2ClientProperties.Registration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.verilag.student_details_database.models.AuthenticationResponse;
import com.verilag.student_details_database.models.Student;
import com.verilag.student_details_database.repository.StudentRepository;

@Service
public class AuthenticationService {
    private final StudentRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    public final AuthenticationManager authenticationManager;

    public AuthenticationService(StudentRepository repository, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = null;
    }

    public AuthenticationResponse login(Student request){

        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                    request.getUsername(),
                    request.getPassword())
        );
        
        Student student=repository.findByEmail(request.getEmail());
        String token=jwtService.generateToken(student);
        return new AuthenticationResponse(token);
    }



    
}
