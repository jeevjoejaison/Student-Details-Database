package com.verilag.student_details_database.models.formModels;

import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@PrimaryKeyJoinColumn(name = "sports_event_id")
@Getter
@Setter
@NoArgsConstructor
public class SportsEventModel extends EventDetails {
    private String participationType;
}
