package com.verilag.student_details_database.services.authServices;

import com.verilag.student_details_database.models.Role;
import com.verilag.student_details_database.models.User;
import com.verilag.student_details_database.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    /**
     * Load user by email for authentication.
     *
     * @param email The user's email.
     * @return UserDetails object for Spring Security.
     * @throws UsernameNotFoundException If the user is not found.
     */
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
        System.out.println("User fetched: " + user);

        // Convert User object into Spring Security UserDetails
        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                List.of(new SimpleGrantedAuthority("ROLE_" + user.getRole()))  // Assign role properly
        );
    }

    /**
     * Fetch user by email.
     *
     * @param email The user's email.
     * @return The User object.
     * @throws UsernameNotFoundException If the user is not found.
     */
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
    }

    /**
     * Fetch user by ID.
     *
     * @param userId The user's ID.
     * @return The User object.
     * @throws UsernameNotFoundException If the user is not found.
     */
    public User getUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with ID: " + userId));
    }

    /**
     * Create a new user with the given email and default role.
     *
     * @param email The user's email.
     * @param role  The user's role (e.g., "STUDENT", "ADMIN").
     * @return The created User object.
     */


    /**
     * Check if a user exists by email.
     *
     * @param email The user's email.
     * @return True if the user exists, false otherwise.
     */
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    /**
     * Save or update a user.
     *
     * @param user The user to save or update.
     * @return The saved or updated user.
     */
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    /**
     * Delete a user by ID.
     *
     * @param userId The ID of the user to delete.
     */
    public void deleteUserById(Long userId) {
        userRepository.deleteById(userId);
    }

    /**
     * Fetch all users.
     *
     * @return A list of all users.
     */
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}