package com.verilag.student_details_database.models.externalrepo;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class FacultyConferencePaper {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-increment ID
    private Long id;

    private String author;
    private Integer year;
    private String doi;

    @Column(unique = true, nullable = false)
    private String conferenceName;
    private String location;
    private String organizer;
    private Double acceptanceRate;
    private LocalDate startDate;
    private LocalDate endDate;
    private String url;
    private String title;
    private String abstractText;
    private String description;

    // Constructors
    public FacultyConferencePaper() {}

    public FacultyConferencePaper(String author, Integer year, String doi, String conferenceName, 
                                     String location, String organizer, Double acceptanceRate, 
                                     LocalDate startDate, LocalDate endDate, String url, 
                                     String title, String abstractText,String description) {
        this.author = author;
        this.year = year;
        this.doi = doi;
        this.conferenceName = conferenceName;
        this.location = location;
        this.organizer = organizer;
        this.acceptanceRate = acceptanceRate;
        this.startDate = startDate;
        this.endDate = endDate;
        this.url = url;
        this.title = title;
        this.abstractText = abstractText;
        this.description=description;
    }
    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public String getDoi() {
        return doi;
    }

    public void setDoi(String doi) {
        this.doi = doi;
    }

    public String getConferenceName() {
        return conferenceName;
    }

    public void setConferenceName(String conferenceName) {
        this.conferenceName = conferenceName;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getOrganizer() {
        return organizer;
    }

    public void setOrganizer(String organizer) {
        this.organizer = organizer;
    }

    public Double getAcceptanceRate() {
        return acceptanceRate;
    }

    public void setAcceptanceRate(Double acceptanceRate) {
        this.acceptanceRate = acceptanceRate;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAbstractText() {
        return abstractText;
    }

    public void setAbstractText(String abstractText) {
        this.abstractText = abstractText;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
    
    // Getters and setters
    
}
