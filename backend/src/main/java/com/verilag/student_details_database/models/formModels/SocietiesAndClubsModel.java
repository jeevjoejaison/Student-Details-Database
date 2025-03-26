package com.verilag.student_details_database.models.formModels;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Lob;
import jakarta.persistence.PrimaryKeyJoinColumn;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@PrimaryKeyJoinColumn(name = "society_club_id")

public class SocietiesAndClubsModel extends Activity {
    private String societyOrClubName;
    private String category;
    private String membershipType;
    @Lob
    @Column(name = "proof", columnDefinition = "LONGBLOB")
    private byte[] proof; // Stores offer letter file as binary data

    public SocietiesAndClubsModel() {
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
    public byte[] getProof() {
        return proof;
    }
    public void setProof(byte[] proof) {
        this.proof = proof;
    }

    public String getSocietyOrClubName() {
        return societyOrClubName;
    }

    public void setSocietyOrClubName(String societyOrClubName) {
        this.societyOrClubName = societyOrClubName;
    }
}
