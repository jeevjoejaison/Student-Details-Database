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
    private String name;
    private String category;
    private String membershipType;
    @Lob
    @Column(name = "proof", columnDefinition = "LONGBLOB")
    private byte[] proof; // Stores offer letter file as binary data
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
    public byte[] getProof() {
        return proof;
    }
    public void setProof(byte[] proof) {
        this.proof = proof;
    }


    public SocietiesAndClubsModel(){}


}
