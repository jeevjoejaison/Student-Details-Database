package com.verilag.student_details_database.models.authModels.dtos;

public class StudentRegistrationRequest {
    
    public StudentRegistrationRequest() {
    }
    public StudentRegistrationRequest(String email, String password, String rollNumber, String name, String department, String section, String faEmail) {
        this.email = email;
        this.password = password;
        this.rollNumber = rollNumber;
        this.name = name;
        this.department = department;
        this.section = section;
        this.faEmail = faEmail;
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
    public String getRollNumber() {
        return rollNumber;
    }
    public void setRollNumber(String rollNumber) {
        this.rollNumber = rollNumber;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getDepartment() {
        return department;
    }
    public void setDepartment(String department) {
        this.department = department;
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
    private String email;
    private String password;
    private String rollNumber;
    private String name;
    private String department;
    private String section;
    private String faEmail; // Pass FA email from frontend
}
