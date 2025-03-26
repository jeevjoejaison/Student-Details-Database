package com.verilag.student_details_database.controller.authController;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.verilag.student_details_database.models.*;
import com.verilag.student_details_database.models.authModels.AuthenticationRequest;
import com.verilag.student_details_database.models.authModels.AuthenticationResponse;
import com.verilag.student_details_database.models.authModels.dtos.EmailRequest;
import com.verilag.student_details_database.models.authModels.dtos.StudentRegistrationRequest;
import com.verilag.student_details_database.services.authServices.AuthenticationService;
import com.verilag.student_details_database.services.authServices.UserService;
import com.verilag.student_details_database.utils.GoogleTokenVerifier;

import java.util.Map;

import org.apache.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174", "http://localhost:5175"}) // Allow frontend requests
public class AuthenticationController {

    private final AuthenticationService authenticationService;
    
    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @Autowired
    private UserService userService;

    @PostMapping("/google-login")
    public ResponseEntity<?> googleLogin(@RequestBody Map<String, String> request) {
    String token = request.get("token");

    // Verify the Google token
    GoogleIdToken.Payload payload = GoogleTokenVerifier.verifyToken(token);
    if (payload == null) {
        return ResponseEntity.status(HttpStatus.SC_UNAUTHORIZED).body("Invalid token");
    }

    // Extract email from the token
    String email = payload.getEmail();

    // Check if the user exists in the database
    User user = userService.getUserByEmail(email);
    if (user == null) {
        return ResponseEntity.status(HttpStatus.SC_NOT_FOUND).body("User not registered");
    }

    if (!user.isActive()) {
        return ResponseEntity.status(HttpStatus.SC_UNAUTHORIZED).body("Invalid User");
    }

    // If the user is a student, return additional details
    if (user.getRole() == Role.STUDENT && user instanceof Student) {
        Student student = (Student) user;
        return ResponseEntity.ok(Map.of(
            "userId", student.getUserId(),
            "name", student.getName(),
            "rollNumber", student.getRollNumber(),
            "section", student.getSection()
        ));
    }

    // Default response for non-student users
    return ResponseEntity.ok(Map.of("userId", user.getUserId()));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody AuthenticationRequest request) {
        AuthenticationResponse response = authenticationService.authenticate(request);
        return response.isSuccess() ? ResponseEntity.ok(response) : ResponseEntity.status(401).body(response);
    }

    @PostMapping("/login-student")
    public ResponseEntity<AuthenticationResponse> loginStudent(@RequestBody AuthenticationRequest request) {
        AuthenticationResponse response = authenticationService.authenticateStudent(request);
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

    @PostMapping("/remove/student")
    public ResponseEntity<AuthenticationResponse> removeStudent(@RequestBody EmailRequest email) {
        //TODO: process POST request
        return ResponseEntity.ok(authenticationService.remove(email.getEmail()));
    }
    
}
