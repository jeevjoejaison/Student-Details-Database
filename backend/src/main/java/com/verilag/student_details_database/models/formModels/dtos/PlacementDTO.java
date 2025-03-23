package com.verilag.student_details_database.models.formModels.dtos;

import java.time.LocalDate;
import org.springframework.web.multipart.MultipartFile;


public class PlacementDTO {

    public PlacementDTO() {
    }

    public PlacementDTO(Long studentId, String company, String role, String location, boolean coreJob, LocalDate joiningDate, String ctc, String hiringMode, MultipartFile offerLetter, String description) {
        this.studentId = studentId;
        this.company = company;
        this.role = role;
        this.location = location;
        this.coreJob = coreJob;
        this.joiningDate = joiningDate;
        this.ctc = ctc;
        this.hiringMode = hiringMode;
        this.offerLetter = offerLetter;
        this.description = description;
    }
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
    public boolean isCoreJob() {
        return coreJob;
    }
    public void setCoreJob(boolean coreJob) {
        this.coreJob = coreJob;
    }
    public LocalDate getJoiningDate() {
        return joiningDate;
    }
    public void setJoiningDate(LocalDate joiningDate) {
        this.joiningDate = joiningDate;
    }
    public String getCtc() {
        return ctc;
    }
    public void setCtc(String ctc) {
        this.ctc = ctc;
    }
    public String getHiringMode() {
        return hiringMode;
    }
    public void setHiringMode(String hiringMode) {
        this.hiringMode = hiringMode;
    }
    public MultipartFile getOfferLetter() {
        return offerLetter;
    }
    public void setOfferLetter(MultipartFile offerLetter) {
        this.offerLetter = offerLetter;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    private Long studentId;
    private String company;
    private String role;
    private String location;
    private boolean coreJob;
    private LocalDate joiningDate;
    private String ctc;
    private String hiringMode;
    private MultipartFile offerLetter; // File upload
    private String description;
}