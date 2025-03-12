package com.verilag.student_details_database.models.formModels;

import jakarta.persistence.Entity;
import jakarta.persistence.Lob;
import jakarta.persistence.PrimaryKeyJoinColumn;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@PrimaryKeyJoinColumn(name = "society_club_id")
@Getter
@Setter
@NoArgsConstructor
public class SocietiesAndClubsModel extends Activity {
    private String name;
    private String category;
    private String membershipType;
    @Lob
    private byte[] proof;
}
