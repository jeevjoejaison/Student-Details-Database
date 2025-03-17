package com.verilag.student_details_database.models;

import org.springframework.security.crypto.password.PasswordEncoder;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "STUDENT")
@Getter
@Setter
@NoArgsConstructor
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
    @JoinColumn(name = "EMAIL")
    private FA fa; // Reference to FA

    // Constructor for Student
    public Student(String email, String password, String rollNumber, String name, String department, String section, FA fa) {
        super(email, password, Role.STUDENT);
        this.rollNumber = rollNumber;
        this.name = name;
        this.department = department;
        this.section = section;
        this.fa = fa;
    }

    public boolean checkPassword(String password, PasswordEncoder passwordEncoder) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'checkPassword'");
    }
}