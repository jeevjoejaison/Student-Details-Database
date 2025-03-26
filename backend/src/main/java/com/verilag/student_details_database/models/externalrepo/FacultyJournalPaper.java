package com.verilag.student_details_database.models.externalrepo;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;


@Entity
public class FacultyJournalPaper {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-increment ID
    private Long id;

    @NotBlank(message = "Author name is required")
    private String author;

    @NotNull(message = "Year is required")
    @Min(value = 1900, message = "Year must be after 1900")
    private Integer year;

    private String doi;

    @Size(max = 255, message = "URL cannot exceed 255 characters")
    private String url; // Optional

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Abstract is required")
    @Column(length = 10000) // Allows longer abstracts
    private String abstractText;

    @NotBlank(message = "Journal name is required")
    @Column(unique = true, nullable = false) // Ensuring uniqueness
    private String journalName;

    @NotBlank(message = "Publisher is required")
    private String publisher;

    @NotBlank(message = "ISSN is required")
    @Size(min = 8, max = 9, message = "ISSN must be 8-9 characters long")
    private String issn;

    private Double impactFactor;

    @NotNull(message = "Volume is required")
    private Integer volume;

    @NotNull(message = "Issue is required")
    private Integer issue;

    private String pageNumbers;

    @NotBlank(message = "Faculty department is required")
    private String facultyDepartment;

    @NotBlank(message = "Affiliation is required")
    private String affiliation;

    private String description;

    // Constructors
    public FacultyJournalPaper() {}

    public FacultyJournalPaper(String author, Integer year, String doi, String url, String title, String abstractText,
                               String journalName, String publisher, String issn, Double impactFactor,
                               Integer volume, Integer issue, String pageNumbers, 
                               String facultyDepartment, String affiliation) {
        this.author = author;
        this.year = year;
        this.doi = doi;
        this.url = url;
        this.title = title;
        this.abstractText = abstractText;
        this.journalName = journalName;
        this.publisher = publisher;
        this.issn = issn;
        this.impactFactor = impactFactor;
        this.volume = volume;
        this.issue = issue;
        this.pageNumbers = pageNumbers;
        this.facultyDepartment = facultyDepartment;
        this.affiliation = affiliation;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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
        return issn;
    }

    public void setISSN(String issn) {
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

    public String getFacultyDepartment() {
        return facultyDepartment;
    }

    public void setFacultyDepartment(String facultyDepartment) {
        this.facultyDepartment = facultyDepartment;
    }

    public String getAffiliation() {
        return affiliation;
    }

    public void setAffiliation(String affiliation) {
        this.affiliation = affiliation;
    }

    public String getDescription() {
        return description;   
    }
    
}
