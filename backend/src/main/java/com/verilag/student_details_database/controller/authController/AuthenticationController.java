package com.verilag.student_details_database.controller.authController;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.verilag.student_details_database.models.*;
import com.verilag.student_details_database.models.authModels.AuthenticationRequest;
import com.verilag.student_details_database.models.authModels.AuthenticationResponse;
import com.verilag.student_details_database.models.authModels.dtos.StudentRegistrationRequest;
import com.verilag.student_details_database.services.authServices.AuthenticationService;

@RestController
@RequestMapping("/api/users")
public class AuthenticationController {

    private final AuthenticationService authService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationController(AuthenticationService authService, AuthenticationManager authenticationManager) {
        this.authService = authService;
        this.authenticationManager = authenticationManager;
    }

    // Register a new student
    @PostMapping("/register/student")
    public ResponseEntity<AuthenticationResponse> registerStudent(@RequestBody StudentRegistrationRequest request) {
        // Create a Student object from the request data
        Student student = new Student(
            request.getEmail(),
            request.getPassword(),
            request.getRollNumber(),
            request.getName(),
            request.getDepartment(),
            request.getSection(),
            null // FA will be set in the service layer
        );

        // Call the service layer method with the student object and FA email
        AuthenticationResponse response = authService.registerStudent(student, request.getFaEmail());

        return ResponseEntity.status(response.isSuccess() ? 201 : 400).body(response);
    }



    // Register a new FA
    @PostMapping("/register/fa")
    public ResponseEntity<AuthenticationResponse> registerFA(@RequestBody FA fa) {
        AuthenticationResponse response = authService.registerFA(fa);
        return ResponseEntity.status(response.isSuccess() ? 201 : 400).body(response);
    }

    // Register a new Admin
    @PostMapping("/register/admin")
    public ResponseEntity<AuthenticationResponse> registerAdmin(@RequestBody Admin admin) {
        AuthenticationResponse response = authService.registerAdmin(admin);
        return ResponseEntity.status(response.isSuccess() ? 201 : 400).body(response);
    }

    @PostMapping("/auth/login")
    public ResponseEntity<AuthenticationResponse> studentLogin(@RequestBody AuthenticationRequest request) {
        System.out.println("In controller");
        AuthenticationResponse response = authService.authenticate(request);
        return ResponseEntity.status(response.isSuccess() ? 200 : 401).body(response);
    }


}
