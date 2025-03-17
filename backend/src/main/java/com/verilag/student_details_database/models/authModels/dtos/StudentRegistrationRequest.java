package com.verilag.student_details_database.models.authModels.dtos;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class StudentRegistrationRequest {
    private String email;
    private String password;
    private String rollNumber;
    private String name;
    private String department;
    private String section;
    private String faEmail; // Pass FA email from frontend
}
