package com.verilag.student_details_database.models.authModels;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class AuthenticationResponse {
    private String message;
    private boolean success;
    private Long userId;
    public AuthenticationResponse(String message, boolean success, Long userId) {
        this.message = message;
        this.success = success;
        this.userId = userId;
    }
    public AuthenticationResponse(String message, boolean success) {
        this.message = message;
        this.success = success;
    }
    
}
