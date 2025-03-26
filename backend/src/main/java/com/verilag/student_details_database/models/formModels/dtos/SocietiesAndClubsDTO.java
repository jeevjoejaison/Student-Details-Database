package com.verilag.student_details_database.models.formModels.dtos;

import org.springframework.web.multipart.MultipartFile;

public class SocietiesAndClubsDTO {

    public SocietiesAndClubsDTO() {
    }
    
    public SocietiesAndClubsDTO(Long studentId, String name, String rollNumber, String type, String societyOrClubname,
            String category, String membershipType, MultipartFile proof, String proofBase64) {
        this.studentId = studentId;
        this.name = name;
        this.rollNumber = rollNumber;
        this.type = type;
        this.societyOrClubname = societyOrClubname;
        this.category = category;
        this.membershipType = membershipType;
        this.proof = proof;
        this.proofBase64 = proofBase64;
    }

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

    public String getSocietyOrClubname() {
        return societyOrClubname;
    }

    public void setSocietyOrClubname(String societyOrClubname) {
        this.societyOrClubname = societyOrClubname;
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


    private Long studentId;
    private String name;
    private String rollNumber;
    private String type;
    private String societyOrClubname;
    private String category;
    private String membershipType;
    private MultipartFile proof; // File upload
    private String proofBase64;
}
