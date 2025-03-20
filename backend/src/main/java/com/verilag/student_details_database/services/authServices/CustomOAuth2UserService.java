package com.verilag.student_details_database.services.authServices;

import com.verilag.student_details_database.models.User;
import com.verilag.student_details_database.repository.UserRepository;

import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository studentRepository;

    public CustomOAuth2UserService(UserRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);

        // Extract email from Google authentication response
        String email = oAuth2User.getAttribute("email");

        // Check if the email exists in the student database
        Optional<User> user = studentRepository.findByEmail(email);
        if (user.isEmpty()) {
            throw new OAuth2AuthenticationException("Access denied! Email is not registered in the system.");
        }

        return oAuth2User; // Proceed with authentication
    }
}
