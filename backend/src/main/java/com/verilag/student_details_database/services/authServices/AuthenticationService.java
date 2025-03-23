package com.verilag.student_details_database.services.authServices;

import com.verilag.student_details_database.models.*;
import com.verilag.student_details_database.models.authModels.AuthenticationRequest;
import com.verilag.student_details_database.models.authModels.AuthenticationResponse;
import com.verilag.student_details_database.models.authModels.dtos.StudentRegistrationRequest;
import com.verilag.student_details_database.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthenticationService {

    private final UserRepository userRepository;

    public AuthenticationService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Authenticate a user based on email and password.
     *
     * @param request Authentication request containing email and password.
     * @return AuthenticationResponse indicating success or failure.
     */
    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        Optional<User> optionalUser = userRepository.findByEmail(request.getEmail());

        if (optionalUser.isEmpty()) {
            return new AuthenticationResponse("User not found", false, null);
        }

        User user = optionalUser.get();

        // Check if the password matches
        if (!request.getPassword().equals(user.getPassword())) {
            return new AuthenticationResponse("Invalid email or password", false, null);
        }
        

        // Return userId on successful login
        return new AuthenticationResponse("Login successful!", true, user.getUserId());
    }

    /**
     * Register a new student.
     *
     * @param student The student to register.
     * @return AuthenticationResponse indicating success or failure.
     */
    public AuthenticationResponse registerStudent(StudentRegistrationRequest student) {
        if (userRepository.findByEmail(student.getEmail()).isPresent()) {
            return new AuthenticationResponse("Email is already registered", false);
        }

        // Find FA by email
        User faUser = userRepository.findByEmail(student.getFaEmail())
                .orElseThrow(() -> new RuntimeException("FA not found with email: " + student.getFaEmail()));

        // Ensure user is an FA
        if (!(faUser instanceof FA)) {
            return new AuthenticationResponse("User with this email is not an FA", false);
        }

        FA fa = (FA) faUser; // Cast to FA

        Student student1=new Student();
        student1.setDepartment(student.getDepartment());
        student1.setEmail(student.getEmail());
        student1.setFa(fa);
        student1.setName(student.getName());
        student1.setPassword(student.getPassword());
        student1.setRole(Role.STUDENT);
        student1.setRollNumber(student.getRollNumber());
        student1.setSection(student.getSection());


        // Save student to DB
        userRepository.save(student1);

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
        fa.setPassword((fa.getPassword()));
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
        admin.setPassword((admin.getPassword()));
        admin.setRole(Role.ADMIN);

        userRepository.save(admin);

        return new AuthenticationResponse("Admin registration successful!", true);
    }



}