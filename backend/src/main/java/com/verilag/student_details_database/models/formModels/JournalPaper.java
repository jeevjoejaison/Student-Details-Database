package com.verilag.student_details_database.models.formModels;

import jakarta.persistence.Entity;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

@Entity
public class JournalPaper extends ResearchPaper {
    
    @NotBlank(message = "Journal name is required")
    private String journalName;

    @NotBlank(message = "Publisher is required")
    private String publisher;

    @NotBlank(message = "ISSN is required")
    @Size(min = 8, max = 9, message = "ISSN must be 8-9 characters long")
    private String ISSN;

    @NotNull(message = "Impact factor is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Impact factor must be greater than 0")
    private Double impactFactor;

    @NotNull(message = "Volume is required")
    private Integer volume;

    @NotNull(message = "Issue is required")
    private Integer issue;

    @NotBlank(message = "Page numbers are required")
    private String pageNumbers;

    public String getJournalName() {
        return journalName;
    }

    public void setJournalName(String journalName) {
        this.journalName = journalName;
    }

    public String getPublisher() {
        return publisher;
    }

    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    public String getISSN() {
        return ISSN;
    }

    public void setISSN(String iSSN) {
        ISSN = iSSN;
    }

    public Double getImpactFactor() {
        return impactFactor;
    }

    public void setImpactFactor(Double impactFactor) {
        this.impactFactor = impactFactor;
    }

    public Integer getVolume() {
        return volume;
    }

    public void setVolume(Integer volume) {
        this.volume = volume;
    }

    public Integer getIssue() {
        return issue;
    }

    public void setIssue(Integer issue) {
        this.issue = issue;
    }

    public String getPageNumbers() {
        return pageNumbers;
    }

    public void setPageNumbers(String pageNumbers) {
        this.pageNumbers = pageNumbers;
    }

    

}
