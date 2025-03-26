package com.verilag.student_details_database.models.formModels;
import jakarta.persistence.*;

@Entity
@Table(name = "activity")
@Inheritance(strategy = InheritanceType.JOINED) //Ensures proper subclass mapping
public class Activity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long activityId;
    private String name;
    private String rollNumber;
    private String type;
    private String description;
    private boolean approved;
    private Long studentId;
    
    @Column(name = "comments", columnDefinition = "TEXT", length = 500)  // New column to store comments
    private String comments;

    public Activity() {

    }

    public Activity(String description, boolean approved, Long studentId, String comments) {
            this.description = description;
            this.approved = approved;
            this.studentId = studentId;
            this.comments = comments;
    }
    
    public Activity(Long activityId, String name, String rollNumber, String type, String description,
            boolean approved, Long studentId) {
        this.activityId = activityId;
        this.name = name;
        this.rollNumber = rollNumber;
        this.type = type;
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
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getRollNumber() { return rollNumber; }
    public void setRollNumber(String rollNumber) { this.rollNumber = rollNumber; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getComments() { return comments; }
    public void setComments(String comments) { this.comments = comments; }

}
