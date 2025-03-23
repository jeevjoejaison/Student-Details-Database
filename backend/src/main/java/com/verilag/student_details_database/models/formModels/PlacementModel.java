package com.verilag.student_details_database.models.formModels;

import java.time.LocalDate;
import jakarta.persistence.Entity;

import jakarta.persistence.PrimaryKeyJoinColumn;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@PrimaryKeyJoinColumn(name = "placement_id")

public class PlacementModel extends JobModel {
    private boolean coreJob;
    private LocalDate joiningDate;
    private String ctc;
    private String hiringMode;
    public boolean isCoreJob() {
        return coreJob;
    }
    public void setCoreJob(boolean coreJob) {
        this.coreJob = coreJob;
    }
    public LocalDate getJoiningDate() {
        return joiningDate;
    }
    public void setJoiningDate(LocalDate joiningDate) {
        this.joiningDate = joiningDate;
    }
    public String getCtc() {
        return ctc;
    }
    public void setCtc(String ctc) {
        this.ctc = ctc;
    }
    public String getHiringMode() {
        return hiringMode;
    }
    public void setHiringMode(String hiringMode) {
        this.hiringMode = hiringMode;
    }
public PlacementModel(){}
    

}
