package com.verilag.student_details_database.models.formModels;

import java.time.LocalDate;
import jakarta.persistence.Entity;

import jakarta.persistence.PrimaryKeyJoinColumn;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@PrimaryKeyJoinColumn(name = "placement_id")
@Getter
@Setter
@NoArgsConstructor
public class PlacementModel extends JobModel {
    private boolean coreJob;
    private LocalDate joiningDate;
    private String ctc;
    private String hiringMode;

}
