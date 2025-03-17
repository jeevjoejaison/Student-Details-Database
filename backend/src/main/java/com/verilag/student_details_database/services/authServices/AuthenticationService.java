package com.verilag.student_details_database.services.authServices;

import com.verilag.student_details_database.models.*;
import com.verilag.student_details_database.models.authModels.AuthenticationRequest;
import com.verilag.student_details_database.models.authModels.AuthenticationResponse;
import com.verilag.student_details_database.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    /**
     * Authenticate a user based on email and password.
     *
     * @param request Authentication request containing email and password.
     * @return AuthenticationResponse indicating success or failure.
     */
    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        try {
            System.out.println("Authenticating user: " + request.getEmail());

            // Find user by email
            Optional<User> optionalUser = userRepository.findByEmail(request.getEmail());
            if (optionalUser.isEmpty()) {
                throw new BadCredentialsException("User not found with this email");
            }

            // Authenticate using AuthenticationManager (triggers session & cookies)
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );

            SecurityContextHolder.getContext().setAuthentication(authentication); // Set authenticated user in security context

            // Get authenticated user details
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();

            return new AuthenticationResponse("Login successful!", true);
        } catch (BadCredentialsException e) {
            return new AuthenticationResponse("Invalid email or password", false);
        } catch (Exception e) {
            return new AuthenticationResponse("Authentication failed", false);
        }
    }

    /**
     * Register a new student.
     *
     * @param student The student to register.
     * @return AuthenticationResponse indicating success or failure.
     */
    public AuthenticationResponse registerStudent(Student student, String faEmail) {
        if (userRepository.findByEmail(student.getEmail()).isPresent()) {
            return new AuthenticationResponse("Email is already registered", false);
        }

        // Find FA by email
        User faUser = userRepository.findByEmail(faEmail)
                .orElseThrow(() -> new RuntimeException("FA not found with email: " + faEmail));

        // Ensure user is an FA
        if (!(faUser instanceof FA)) {
            return new AuthenticationResponse("User with this email is not an FA", false);
        }

        FA fa = (FA) faUser; // Cast to FA

        // Hash password and assign role
        student.setPassword(passwordEncoder.encode(student.getPassword()));
        student.setRole(Role.STUDENT);
        student.setFa(fa);

        // Save student to DB
        userRepository.save(student);

        return new AuthenticationResponse("Student registration successful!", true);
    }

    /**
     * Register a new FA (Faculty Advisor).
     *
     * @param fa The FA to register.
     * @return AuthenticationResponse indicating success or failure.
     */
    public AuthenticationResponse registerFA(FA fa) {
        if (userRepository.findByEmail(fa.getEmail()).isPresent()) {
            return new AuthenticationResponse("Email is already registered", false);
        }

        // Hash password and assign role
        fa.setPassword(passwordEncoder.encode(fa.getPassword()));
        fa.setRole(Role.FA);

        userRepository.save(fa);

        return new AuthenticationResponse("FA registration successful!", true);
    }

    /**
     * Register a new admin.
     *
     * @param admin The admin to register.
     * @return AuthenticationResponse indicating success or failure.
     */
    public AuthenticationResponse registerAdmin(Admin admin) {
        if (userRepository.findByEmail(admin.getEmail()).isPresent()) {
            return new AuthenticationResponse("Email is already registered", false);
        }

        // Hash password and assign role
        admin.setPassword(passwordEncoder.encode(admin.getPassword()));
        admin.setRole(Role.ADMIN);

        userRepository.save(admin);

        return new AuthenticationResponse("Admin registration successful!", true);
    }


    public AuthenticationResponse registerOAuth2User(OAuth2User oAuth2User) {
        String email = oAuth2User.getAttribute("email");

        Optional<User> existingUser = userRepository.findByEmail(email);
        if (existingUser.isPresent()) {
            return new AuthenticationResponse("User already exists!", true);
        }

        User newUser = new Student(
            email,
            "", // No password needed for OAuth2 users
            "GoogleUser", "Google", "N/A", "N/A", null
        );
        newUser.setOauth2Provider("GOOGLE");
        newUser.setOauth2Id(oAuth2User.getAttribute("sub")); // Google user ID

        userRepository.save(newUser);
        return new AuthenticationResponse("Google authentication successful!", true);
    }

}
