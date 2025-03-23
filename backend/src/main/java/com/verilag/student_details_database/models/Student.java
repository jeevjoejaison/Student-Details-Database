package com.verilag.student_details_database.models;

import org.springframework.security.crypto.password.PasswordEncoder;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
@Entity
@Table(name = "STUDENT")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"}) // To ignore proxy issues

public class Student extends User {

    @Column(name = "ROLL_NUMBER", length = 10, unique = true)
    @NotBlank(message = "Roll number is required")
    private String rollNumber;

    @Column(name = "NAME", length = 100)
    @NotBlank(message = "Name is required")
    private String name;

    @Column(name = "DEPARTMENT", length = 50)
    @NotBlank(message = "Department is required")
    private String department;

    @Column(name = "SECTION", length = 10)
    @NotBlank(message = "Section is required")
    private String section;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinColumn(name = "FA_ID", referencedColumnName = "USER_ID", nullable = false)
    private FA fa; // Reference to FA

    public Student(){
        
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

    public FA getFa() {
        return fa;
    }

    public void setFa(FA fa) {
        this.fa = fa;
    }

    // Constructor for Student
    public Student(String email, String password, String rollNumber, String name, String department, String section, FA fa) {
        super(email, password, Role.STUDENT);
        this.rollNumber = rollNumber;
        this.name = name;
        this.department = department;
        this.section = section;
        this.fa = fa;
    }
}