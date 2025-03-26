package com.verilag.student_details_database.models.formModels;

import java.time.LocalDate;

import jakarta.persistence.*;

@Entity
@PrimaryKeyJoinColumn(name = "event_id") // Links with Activity
public class EventDetails extends Activity {

    private String eventName;
    private String awards;
    private LocalDate date;
    private String location;
    @Lob
    @Column(name = "proof", columnDefinition = "LONGBLOB")
    private byte[] proof;
    

    public EventDetails() {} 

    public EventDetails(String eventName, String awards, byte[] proof, LocalDate date, String location) {
        this.eventName = eventName;
        this.awards = awards;
        this.proof = proof;
        this.date = date;
        this.location = location;
    }
    public EventDetails(String description, boolean approved, String eventName, String awards,
            byte[] proof, LocalDate date, String location, Long studentId, String comments) {
        super(description, approved, studentId, comments);
        this.eventName = eventName;
        this.awards = awards;
        this.proof = proof;
        this.date = date;
        this.location = location;
    }
    public String getEventName() {
        return eventName;
    }
    public void setEventName(String eventName) {
        this.eventName = eventName;
    }
    public String getAwards() {
        return awards;
    }
    public void setAwards(String awards) {
        this.awards = awards;
    }
    public byte[] getProof() {
        return proof;
    }
    public void setProof(byte[] proof) {
        this.proof = proof;
    }
    public LocalDate getDate() {
        return date;
    }
    public void setDate(LocalDate date) {
        this.date = date;
    }
    public String getLocation() {
        return location;
    }
    public void setLocation(String location) {
        this.location = location;
    }

    
    
}
