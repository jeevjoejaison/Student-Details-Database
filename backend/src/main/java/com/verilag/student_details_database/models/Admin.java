package com.verilag.student_details_database.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "ADMIN")

public class Admin extends User {

    @Column(name = "ADMIN_NAME", length = 100)
    @NotBlank(message = "Admin name is required")
    private String adminName;

    // Constructor for Admin
    public Admin(String email, String password, String adminName) {
        super(email, password, Role.ADMIN);
        this.adminName = adminName;
    }

    public String getAdminName() {
        return adminName;
    }

    public void setAdminName(String adminName) {
        this.adminName = adminName;
    }


    public Admin(){}

}