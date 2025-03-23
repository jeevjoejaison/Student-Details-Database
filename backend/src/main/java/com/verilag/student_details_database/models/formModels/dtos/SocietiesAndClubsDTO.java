package com.verilag.student_details_database.models.formModels.dtos;

import org.springframework.web.multipart.MultipartFile;
import lombok.*;

public class SocietiesAndClubsDTO {
    private Long studentId;
    private String name;
    private String category;
    private String membershipType;
    private MultipartFile proof; // File upload
    private String proofBase64;
    public Long getStudentId() {
        return studentId;
    }
    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getCategory() {
        return category;
    }
    public void setCategory(String category) {
        this.category = category;
    }
    public String getMembershipType() {
        return membershipType;
    }
    public void setMembershipType(String membershipType) {
        this.membershipType = membershipType;
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
    public SocietiesAndClubsDTO(Long studentId, String name, String category, String membershipType,
            MultipartFile proof, String proofBase64) {
        this.studentId = studentId;
        this.name = name;
        this.category = category;
        this.membershipType = membershipType;
        this.proof = proof;
        this.proofBase64 = proofBase64;
    }

    public SocietiesAndClubsDTO(){}

    


}
