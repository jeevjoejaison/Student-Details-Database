package com.verilag.student_details_database.controller.authController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.verilag.student_details_database.config.TestSecurityConfig;
import com.verilag.student_details_database.models.*;
import com.verilag.student_details_database.models.authModels.AuthenticationRequest;
import com.verilag.student_details_database.models.authModels.AuthenticationResponse;
import com.verilag.student_details_database.models.authModels.dtos.EmailRequest;
import com.verilag.student_details_database.models.authModels.dtos.StudentRegistrationRequest;
import com.verilag.student_details_database.services.authServices.AuthenticationService;
import com.verilag.student_details_database.services.authServices.UserService;
import com.verilag.student_details_database.utils.GoogleTokenVerifier;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;


import java.util.Map;


@WebMvcTest(AuthenticationController.class)
@Import(TestSecurityConfig.class)
class AuthenticationControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AuthenticationService authenticationService;

    @MockBean
    private UserService userService;

    MockedStatic<GoogleTokenVerifier> mockedGoogleVerifier;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void testLoginSuccess() throws Exception {
        AuthenticationRequest request = new AuthenticationRequest();
        request.setEmail("student@example.com");
        request.setPassword("password123");

        AuthenticationResponse response = new AuthenticationResponse("Login success", true, 1L);

        Mockito.when(authenticationService.authenticate(any())).thenReturn(response);

        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.message").value("Login success"))
            .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    void testLoginFailure() throws Exception {
        AuthenticationRequest request = new AuthenticationRequest();
        request.setEmail("wrong@example.com");
        request.setPassword("wrongpass");

        AuthenticationResponse response = new AuthenticationResponse("Invalid credentials", false);

        Mockito.when(authenticationService.authenticate(any())).thenReturn(response);

        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isUnauthorized())
            .andExpect(jsonPath("$.message").value("Invalid credentials"));
    }

    @Test
    void testRegisterStudent() throws Exception {
        StudentRegistrationRequest request = new StudentRegistrationRequest(
                "John Doe", "john@example.com", "password123",
                "CSE", "21CSR123", "A", "fa@example.com");

        AuthenticationResponse response = new AuthenticationResponse("Registered successfully", true, 1L);

        Mockito.when(authenticationService.registerStudent(any())).thenReturn(response);

        mockMvc.perform(post("/api/auth/register/student")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.message").value("Registered successfully"))
            .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    void testRemoveStudent() throws Exception {
        EmailRequest request = new EmailRequest();
        request.setEmail("student@example.com");

        AuthenticationResponse response = new AuthenticationResponse("Removed successfully", true);

        Mockito.when(authenticationService.remove(anyString())).thenReturn(response);

        mockMvc.perform(post("/api/auth/remove/student")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.message").value("Removed successfully"));
    }

    @Test
    void testGoogleLoginSuccessForStudent() throws Exception {
        try (MockedStatic<GoogleTokenVerifier> verifierMockedStatic = Mockito.mockStatic(GoogleTokenVerifier.class)) {
            GoogleIdToken.Payload payload = Mockito.mock(GoogleIdToken.Payload.class);
            Mockito.when(payload.getEmail()).thenReturn("student@example.com");

            verifierMockedStatic.when(() -> GoogleTokenVerifier.verifyToken(any())).thenReturn(payload);

            Student student = new Student();
            student.setEmail("student@example.com");
            student.setUserId(1L);
            student.setRole(Role.STUDENT);
            student.setName("John Doe");
            student.setRollNumber("21CSR123");
            student.setSection("A");
            student.setActive(true);

            Mockito.when(userService.getUserByEmail("student@example.com")).thenReturn(student);

            mockMvc.perform(post("/api/auth/google-login")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(Map.of("token", "mocked_token"))))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("John Doe"))
                .andExpect(jsonPath("$.rollNumber").value("21CSR123"))
                .andExpect(jsonPath("$.section").value("A"));
        }
    }

    @Test
    void testGoogleLoginInvalidToken() throws Exception {
        try (MockedStatic<GoogleTokenVerifier> verifierMockedStatic = Mockito.mockStatic(GoogleTokenVerifier.class)) {
            verifierMockedStatic.when(() -> GoogleTokenVerifier.verifyToken(any())).thenReturn(null);

            mockMvc.perform(post("/api/auth/google-login")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(Map.of("token", "invalid_token"))))
                .andExpect(status().isUnauthorized())
                .andExpect(content().string("Invalid token"));
        }
    }
}
