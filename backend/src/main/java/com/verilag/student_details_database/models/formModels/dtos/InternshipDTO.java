package com.verilag.student_details_database.models.formModels.dtos;

import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;

import org.springframework.web.multipart.MultipartFile;


public class InternshipDTO {
    private Long studentId;
    private String company;
    private String role;
    private String location;
    private LocalDate startDate;
    private LocalDate endDate;
    private Double stipend;
    private String description;
    private MultipartFile offerLetter;
    private String proofBase64;
    public Long getStudentId() {
        return studentId;
    }
    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }
    public String getCompany() {
        return company;
    }
    public void setCompany(String company) {
        this.company = company;
    }
    public String getRole() {
        return role;
    }
    public void setRole(String role) {
        this.role = role;
    }
    public String getLocation() {
        return location;
    }
    public void setLocation(String location) {
        this.location = location;
    }
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
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public MultipartFile getOfferLetter() {
        return offerLetter;
    }
    public void setOfferLetter(MultipartFile offerLetter) {
        this.offerLetter = offerLetter;
    }
    public String getProofBase64() {
        return proofBase64;
    }
    public void setProofBase64(String proofBase64) {
        this.proofBase64 = proofBase64;
    }


    
}
