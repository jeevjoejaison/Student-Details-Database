package com.verilag.student_details_database.models.authModels.dtos;


public class StudentRegistrationRequest {
    private String name;
    private String email;
    private String password;
    private String department;
    private String rollNumber;
    private String section;
    private String faEmail;

    // Getters and Setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
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

    public String getFaEmail() {
        return faEmail;
    }

    public void setFaEmail(String faEmail) {
        this.faEmail = faEmail;
    }

    

    public StudentRegistrationRequest(String name, String email, String password, String department, String rollNumber,
            String section, String faEmail) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.department = department;
        this.rollNumber = rollNumber;
        this.section = section;
        this.faEmail = faEmail;
    }

    public StudentRegistrationRequest(){}
    // Add other getters and setters...
}