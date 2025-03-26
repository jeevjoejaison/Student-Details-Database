package com.verilag.student_details_database.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "FA")

public class FA extends User {

    @Column(name = "NAME", length = 100)
    @NotBlank(message = "Name is required")
    private String name;

    @Column(name = "FA_DEPARTMENT", length = 50)
    @NotBlank(message = "FA department is required")
    private String faDepartment;

    // Constructor for FA
    public FA(String email, String password, String faDepartment) {
        super(email, password, Role.FA);
        this.faDepartment = faDepartment;
    }
    public FA(){
        
    }
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getFaDepartment() {
        return faDepartment;
    }

    public void setFaDepartment(String faDepartment) {
        this.faDepartment = faDepartment;
    }

}
