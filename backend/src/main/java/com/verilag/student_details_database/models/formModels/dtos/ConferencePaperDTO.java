package com.verilag.student_details_database.models.formModels.dtos;

import jakarta.validation.constraints.*;
import java.time.LocalDate;


public class ConferencePaperDTO {

    @NotNull(message = "name is required")
    private String name;
    @NotNull(message = "Roll number is required")
    private String rollNumber;
    private String type;
    
    @NotNull(message = "Student ID is required")
    private Long studentId;

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Author name is required")
    private String author;

    @NotNull(message = "Year is required")
    @Min(value = 1900, message = "Year must be after 1900")
    private Integer year;

    @NotBlank(message = "Conference name is required")
    private String conferenceName;

    @NotBlank(message = "Location is required")
    private String location;

    @NotBlank(message = "Organizer is required")
    private String organizer;

    private Double acceptanceRate; // Made optional by removing @NotNull

    @NotNull(message = "Start date is required")
    private LocalDate startDate;

    @NotNull(message = "End date is required")
    private LocalDate endDate;

    private String doi; // Made optional by removing @NotBlank

    private String url; // Made optional by removing @NotBlank

    @NotBlank(message = "Abstract is required")
    private String abstractText;

    private String description; // Made optional by removing @NotBlank

    public ConferencePaperDTO(@NotNull(message = "name is required") String name,
            @NotNull(message = "Roll number is required") String rollNumber, String type,
            @NotNull(message = "Student ID is required") Long studentId,
            @NotBlank(message = "Title is required") String title,
            @NotBlank(message = "Author name is required") String author,
            @NotNull(message = "Year is required") @Min(value = 1900, message = "Year must be after 1900") Integer year,
            @NotBlank(message = "Conference name is required") String conferenceName,
            @NotBlank(message = "Location is required") String location,
            @NotBlank(message = "Organizer is required") String organizer, Double acceptanceRate,
            @NotNull(message = "Start date is required") LocalDate startDate,
            @NotNull(message = "End date is required") LocalDate endDate, String doi, String url,
            @NotBlank(message = "Abstract is required") String abstractText, String description) {
        this.name = name;
        this.rollNumber = rollNumber;
        this.type = type;
        this.studentId = studentId;
        this.title = title;
        this.author = author;
        this.year = year;
        this.conferenceName = conferenceName;
        this.location = location;
        this.organizer = organizer;
        this.acceptanceRate = acceptanceRate;
        this.startDate = startDate;
        this.endDate = endDate;
        this.doi = doi;
        this.url = url;
        this.abstractText = abstractText;
        this.description = description;
    }

    


    public ConferencePaperDTO(String title, String conferenceName, String location, String organizer,
                              Double acceptanceRate, LocalDate startDate, LocalDate endDate, String doi, String url,
                              String abstractText, String description, String author, Integer year) {
        this.title = title;
        this.conferenceName = conferenceName;
        this.location = location;
        this.organizer = organizer;
        this.acceptanceRate = acceptanceRate;
        this.startDate = startDate;
        this.endDate = endDate;
        this.doi = doi;
        this.url = url;
        this.abstractText = abstractText;
        this.description = description;
        this.author = author;
        this.year = year;
    }
    public ConferencePaperDTO(){
        
    }
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRollNumber() {
        return rollNumber;
    }

    public void setRollNumber(String rollNumber) {
        this.rollNumber = rollNumber;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Long getStudentId() {
        return studentId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
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

    public String getDoi() {
        return doi;
    }

    public void setDoi(String doi) {
        this.doi = doi;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
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

    
}