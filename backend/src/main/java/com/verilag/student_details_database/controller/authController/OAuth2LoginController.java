package com.verilag.student_details_database.controller.authController;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/users/oauth2")
public class OAuth2LoginController {

    @GetMapping("/success")
    public Map<String, Object> success(@AuthenticationPrincipal OAuth2User oauth2User) {
        return oauth2User.getAttributes(); // Returns Google profile info as JSON
    }
}
