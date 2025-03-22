package com.verilag.student_details_database.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "FA")
@Getter
@Setter
@NoArgsConstructor
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
}
