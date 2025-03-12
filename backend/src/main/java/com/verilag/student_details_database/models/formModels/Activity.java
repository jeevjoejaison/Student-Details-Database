package com.verilag.student_details_database.models.formModels;
import jakarta.persistence.*;

@Entity
@Table(name = "activity")
@Inheritance(strategy = InheritanceType.JOINED) //Ensures proper subclass mapping
public class Activity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long activity_id;

    private String description;
    private boolean approved;

    public Activity() {}

    public Activity(String description, boolean approved) {
        this.description = description;
        this.approved = approved;
    }

  
    public Long getActivityId() { return activity_id; }
    public void setActivityId(Long activity_id) { this.activity_id = activity_id; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public boolean isApproved() { return approved; }
    public void setApproved(boolean approved) { this.approved = approved; }
}
