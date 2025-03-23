package com.verilag.student_details_database.controller.authController;

import com.verilag.student_details_database.models.*;
import com.verilag.student_details_database.models.authModels.AuthenticationRequest;
import com.verilag.student_details_database.models.authModels.AuthenticationResponse;
import com.verilag.student_details_database.models.authModels.dtos.StudentRegistrationRequest;
import com.verilag.student_details_database.services.authServices.AuthenticationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173") // Allow frontend requests
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody AuthenticationRequest request) {
        AuthenticationResponse response = authenticationService.authenticate(request);
        return response.isSuccess() ? ResponseEntity.ok(response) : ResponseEntity.status(401).body(response);
    }

    @PostMapping("/register/student")
    public ResponseEntity<AuthenticationResponse> registerStudent(@RequestBody StudentRegistrationRequest student) {
        return ResponseEntity.ok(authenticationService.registerStudent(student));
    }

    @PostMapping("/register/fa")
    public ResponseEntity<AuthenticationResponse> registerFA(@RequestBody FA fa) {
        return ResponseEntity.ok(authenticationService.registerFA(fa));
    }

    @PostMapping("/register/admin")
    public ResponseEntity<AuthenticationResponse> registerAdmin(@RequestBody Admin admin) {
        return ResponseEntity.ok(authenticationService.registerAdmin(admin));
    }
}
