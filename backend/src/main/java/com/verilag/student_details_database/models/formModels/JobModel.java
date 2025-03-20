package com.verilag.student_details_database.models.formModels;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Lob;
import jakarta.persistence.PrimaryKeyJoinColumn;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@PrimaryKeyJoinColumn(name = "job_id")
@Getter
@Setter
@NoArgsConstructor
public class JobModel extends Activity {
    private String company;
    private String role;
    private String location;

    @Lob
    @Column(name = "proof", columnDefinition = "LONGBLOB")
    private byte[] offerLetter; // Stores offer letter file as binary data
}
