package com.verilag.student_details_database.models;

public class AuthenticationResponse {
    private String token;
    public AuthenticationResponse(String token){
        this.token=token;
    }
    public String getToken() {
        return token;
    }

    
}
