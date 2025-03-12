package com.verilag.student_details_database.controller.authController;

import org.springframework.web.bind.annotation.RestController;

import com.verilag.student_details_database.models.Student;
import com.verilag.student_details_database.models.authModels.AuthenticationResponse;
import com.verilag.student_details_database.services.AuthenticationService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
public class AuthenticationController {
    
    private final AuthenticationService authService;

    public AuthenticationController(AuthenticationService authService) {
        this.authService = authService;
    }
    
    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(
            @RequestBody Student request
    ){
        System.out.print("Hi");
        return ResponseEntity.ok(authService.login(request));
    }
}
