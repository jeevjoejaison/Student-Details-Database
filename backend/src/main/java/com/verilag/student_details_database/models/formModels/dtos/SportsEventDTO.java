package com.verilag.student_details_database.models.formModels.dtos;


import java.time.LocalDate;
import org.springframework.web.multipart.MultipartFile;


public class SportsEventDTO {

    public SportsEventDTO() {
    }

    

    public SportsEventDTO(Long studentId, String name, String rollNumber, String type, String eventName,
            String participationType, String location, LocalDate date, String awards, String description,
            MultipartFile proof, String proofBase64) {
        this.studentId = studentId;
        this.name = name;
        this.rollNumber = rollNumber;
        this.type = type;
        this.eventName = eventName;
        this.participationType = participationType;
        this.location = location;
        this.date = date;
        this.awards = awards;
        this.description = description;
        this.proof = proof;
        this.proofBase64 = proofBase64;
    }

    

    public String getName() {
        return name;
    }



    public void setName(String name) {
        this.name = name;
    }



    public String getRollNumber() {
        return rollNumber;
    }



    public void setRollNumber(String rollNumber) {
        this.rollNumber = rollNumber;
    }



    public String getType() {
        return type;
    }



    public void setType(String type) {
        this.type = type;
    }



    public Long getStudentId() {
        return studentId;
    }
    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }
    public String getEventName() {
        return eventName;
    }
    public void setEventName(String eventName) {
        this.eventName = eventName;
    }
    public String getParticipationType() {
        return participationType;
    }
    public void setParticipationType(String participationType) {
        this.participationType = participationType;
    }
    public String getLocation() {
        return location;
    }
    public void setLocation(String location) {
        this.location = location;
    }
    public LocalDate getDate() {
        return date;
    }
    public void setDate(LocalDate date) {
        this.date = date;
    }
    public String getAwards() {
        return awards;
    }
    public void setAwards(String awards) {
        this.awards = awards;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public MultipartFile getProof() {
        return proof;
    }
    public void setProof(MultipartFile proof) {
        this.proof = proof;
    }
    public String getProofBase64() {
        return proofBase64;
    }
    public void setProofBase64(String proofBase64) {
        this.proofBase64 = proofBase64;
    }
    private Long studentId;
    private String name;
    private String rollNumber;
    private String type;
    private String eventName;
    private String participationType;
    private String location;
    private LocalDate date;
    private String awards;
    private String description;
    private MultipartFile proof;
    private String proofBase64;
}
