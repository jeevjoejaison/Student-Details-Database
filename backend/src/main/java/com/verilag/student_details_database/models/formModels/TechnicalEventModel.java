package com.verilag.student_details_database.models.formModels;


import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;

@Entity
@PrimaryKeyJoinColumn(name = "technical_event_id")
public class TechnicalEventModel extends EventDetails {
    private String category;

    public TechnicalEventModel() {}

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
}
