package com.verilag.student_details_database.models.formModels;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "internships")
@Getter
@Setter
public class Internship extends JobModel {
    private LocalDate startDate;
    private LocalDate endDate;
    private Double stipend;
}
