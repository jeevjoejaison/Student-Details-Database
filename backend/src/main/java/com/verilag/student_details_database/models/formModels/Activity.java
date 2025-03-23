package com.verilag.student_details_database.models.formModels;
import jakarta.persistence.*;

@Entity
@Table(name = "activity")
@Inheritance(strategy = InheritanceType.JOINED) //Ensures proper subclass mapping
public class Activity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long activityId;

    private String description;
    private boolean approved;
    private Long studentId;
    public Activity() {

    }

    public Activity(String description, boolean approved, Long studentId) {
            this.description = description;
            this.approved = approved;
            this.studentId = studentId;
    }

  
    public Long getActivityId() { return activityId; }
    public void setActivityId(Long activityId) { this.activityId = activityId; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public boolean isApproved() { return approved; }
    public void setApproved(boolean approved) { this.approved = approved; }

    public Long getStudentId() { return studentId; }
    public void setStudentId(Long studentId) { this.studentId = studentId; }

    
}
