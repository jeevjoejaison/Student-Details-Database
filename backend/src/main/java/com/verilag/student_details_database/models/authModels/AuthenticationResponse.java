package com.verilag.student_details_database.models.authModels;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;


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
    public String getMessage() {
        return message;
    }
    public void setMessage(String message) {
        this.message = message;
    }
    public boolean isSuccess() {
        return success;
    }
    public void setSuccess(boolean success) {
        this.success = success;
    }
    public Long getUserId() {
        return userId;
    }
    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public AuthenticationResponse(){}

    
    
}
