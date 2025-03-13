package com.verilag.student_details_database.models.formModels;

import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;

@Entity
@Table(name = "cultural_events") // Explicit table name
@PrimaryKeyJoinColumn(name = "cultural_event_id") // Links with EventDetails
public class CulturalEventModel extends EventDetails {

    private String category; // Specific to CulturalEvent

   
    public CulturalEventModel() {}

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
}
