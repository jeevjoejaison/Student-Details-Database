package com.verilag.student_details_database.models.formModels;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Lob;
import jakarta.persistence.PrimaryKeyJoinColumn;

@Entity
@PrimaryKeyJoinColumn(name = "job_id")
public class JobModel extends Activity {
    private String company;
    private String role;
    private String location;

    @Lob
    @Column(name = "proof", columnDefinition = "LONGBLOB")
    private byte[] offerLetter; // Stores offer letter file as binary data

    public JobModel() {
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

    public byte[] getOfferLetter() {
        return offerLetter;
    }

    public void setOfferLetter(byte[] offerLetter) {
        this.offerLetter = offerLetter;
    }
}
