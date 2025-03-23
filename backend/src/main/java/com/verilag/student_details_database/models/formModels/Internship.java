package com.verilag.student_details_database.models.formModels;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

import java.time.LocalDate;

import org.springframework.web.multipart.MultipartFile;

@Entity
@Table(name = "internships")
public class Internship extends JobModel {
    public LocalDate getStartDate() {
        return startDate;
    }
    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }
    public LocalDate getEndDate() {
        return endDate;
    }
    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }
    public Double getStipend() {
        return stipend;
    }
    public void setStipend(Double stipend) {
        this.stipend = stipend;
    }
    private LocalDate startDate;
    private LocalDate endDate;
    private Double stipend;

}
