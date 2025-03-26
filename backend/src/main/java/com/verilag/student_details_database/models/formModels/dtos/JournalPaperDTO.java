package com.verilag.student_details_database.models.formModels.dtos;

import lombok.*;
import jakarta.validation.constraints.*;


public class JournalPaperDTO {

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

    @NotBlank(message = "Journal name is required")
    private String journalName;

    @NotBlank(message = "Publisher is required")
    private String publisher;

    @NotBlank(message = "ISSN is required")
    @Size(min = 8, max = 9, message = "ISSN must be 8-9 characters long")
    private String issn;  // Fixed field name

    private Double impactFactor;

    @NotNull(message = "Volume is required")
    private Integer volume;

    @NotNull(message = "Issue is required")
    private Integer issue;

    private String pageNumbers;


    private String doi;

    private String url;

    @NotBlank(message = "Abstract is required")
    private String abstractText;

    private String description;

    public JournalPaperDTO(@NotNull(message = "name is required") String name,
            @NotNull(message = "Roll number is required") String rollNumber, String type,
            @NotNull(message = "Student ID is required") Long studentId,
            @NotBlank(message = "Title is required") String title,
            @NotBlank(message = "Author name is required") String author,
            @NotNull(message = "Year is required") @Min(value = 1900, message = "Year must be after 1900") Integer year,
            @NotBlank(message = "Journal name is required") String journalName,
            @NotBlank(message = "Publisher is required") String publisher,
            @NotBlank(message = "ISSN is required") @Size(min = 8, max = 9, message = "ISSN must be 8-9 characters long") String issn,
            Double impactFactor, @NotNull(message = "Volume is required") Integer volume,
            @NotNull(message = "Issue is required") Integer issue, String pageNumbers, String doi, String url,
            @NotBlank(message = "Abstract is required") String abstractText, String description) {
        this.name = name;
        this.rollNumber = rollNumber;
        this.type = type;
        this.studentId = studentId;
        this.title = title;
        this.author = author;
        this.year = year;
        this.journalName = journalName;
        this.publisher = publisher;
        this.issn = issn;
        this.impactFactor = impactFactor;
        this.volume = volume;
        this.issue = issue;
        this.pageNumbers = pageNumbers;
        this.doi = doi;
        this.url = url;
        this.abstractText = abstractText;
        this.description = description;
    }
    public JournalPaperDTO(String title, String journalName, String publisher, String issn, Double impactFactor,
                           Integer year, Integer volume, Integer issue, String pageNumbers, String doi, String url,
                           String description, String abstractText, String author) {
        this.title = title;
        this.journalName = journalName;
        this.publisher = publisher;
        this.issn = issn;
        this.impactFactor = impactFactor;
        this.year = year;
        this.volume = volume;
        this.issue = issue;
        this.pageNumbers = pageNumbers;
        this.doi = doi;
        this.url = url;
        this.description = description;
        this.abstractText = abstractText;
        this.author = author;
    }
    public JournalPaperDTO(){
        
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

    public String getIssn() {
        return issn;
    }

    public void setIssn(String issn) {
        this.issn = issn;
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
