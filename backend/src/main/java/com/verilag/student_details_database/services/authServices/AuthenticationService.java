package com.verilag.student_details_database.services.authServices;

import com.verilag.student_details_database.models.*;
import com.verilag.student_details_database.models.authModels.AuthenticationRequest;
import com.verilag.student_details_database.models.authModels.AuthenticationResponse;
import com.verilag.student_details_database.models.authModels.dtos.StudentRegistrationRequest;
import com.verilag.student_details_database.repository.StudentRepository;
import com.verilag.student_details_database.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthenticationService {

    private final UserRepository userRepository;
    private final StudentRepository studentRepository;


    public AuthenticationService(UserRepository userRepository,StudentRepository studentRepository) {
        this.userRepository = userRepository;
        this.studentRepository=studentRepository;
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
        
        if(user.isActive()==false){
            return new AuthenticationResponse("Invalid User", false, null);
        }

        // Return userId on successful login
        return new AuthenticationResponse("Login successful!", true, user.getUserId());
    }

    public AuthenticationResponse authenticateStudent(AuthenticationRequest request) {
        System.out.println(request.getEmail());
        Student student = studentRepository.findByEmail(request.getEmail());

        if (student==null) {
            return new AuthenticationResponse("User not found", false, null);
        }

   
        // Check if the password matches
        if (!request.getPassword().equals(student.getPassword())) {
            return new AuthenticationResponse("Invalid email or password", false, null);
        }
        
        if(student.isActive()==false || student.getRole()!=Role.STUDENT){
            return new AuthenticationResponse("Invalid User", false, null);
        }

        // Return userId on successful login
        return new AuthenticationResponse("Login successful!", true, student.getUserId(),student.getName(),student.getRollNumber(),student.getSection());
    }

    public AuthenticationResponse authenticateFaculty(AuthenticationRequest request) {
        System.out.println(request.getEmail());
        User user = userRepository.findByEmail(request.getEmail()).orElse(null);
    
        if (user == null) {
            return new AuthenticationResponse("User not found", false, null);
        }
    
        // Check if the password matches
        if (!request.getPassword().equals(user.getPassword())) {
            return new AuthenticationResponse("Invalid email or password", false, null);
        }
    
        // Check if the user is active and is a faculty advisor
        if (!user.isActive() || user.getRole() != Role.FA) {
            return new AuthenticationResponse("Invalid User", false, null);
        }
    
        // Cast to FA and return faculty-specific details
        FA faculty = (FA) user;
        return new AuthenticationResponse("Login successful!", true, faculty.getUserId());
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
        student1.setActive(true);

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
        fa.setActive(true);
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
        admin.setActive(true);
        userRepository.save(admin);

        return new AuthenticationResponse("Admin registration successful!", true);
    }

    public AuthenticationResponse remove(String email) {

        System.out.println(email);

        Optional<User> optionalUser = userRepository.findByEmail(email);

        if (optionalUser.isEmpty()) {
            return new AuthenticationResponse("User not found", false);
        }

        User user = optionalUser.get();
        user.setActive(false);
        userRepository.save(user); // Persist the updated user status

        return new AuthenticationResponse("User deactivated successfully!", true);
        
    }

}
