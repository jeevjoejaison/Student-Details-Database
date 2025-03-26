package com.verilag.student_details_database.models.authModels;


public class AuthenticationResponse {
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
    
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getRollNumber() {
        return rollNumber;
    }
    public void setRollNumber(String rollNumber) {
        this.rollNumber = rollNumber;
    }
    public String getSection() {
        return section;
    }
    public void setSection(String section) {
        this.section = section;
    }

    private String message;
    private boolean success;
    private Long userId;
    private String name;
    private String rollNumber;
    private String section;
    public AuthenticationResponse(String message, boolean success, Long userId) {
        this.message = message;
        this.success = success;
        this.userId = userId;
    }
    public AuthenticationResponse(String message, boolean success) {
        this.message = message;
        this.success = success;
    }
    public AuthenticationResponse(String message, boolean success, Long userId, String name, String rollNumber,
            String section) {
        this.message = message;
        this.success = success;
        this.userId = userId;
        this.name = name;
        this.rollNumber = rollNumber;
        this.section = section;
    }
    
}
