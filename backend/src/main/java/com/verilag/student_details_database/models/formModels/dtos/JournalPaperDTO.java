package com.verilag.student_details_database.models.formModels.dtos;

import lombok.*;
import jakarta.validation.constraints.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class JournalPaperDTO {

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

    // 🔴 **Missing Constructor - Now Added**
    public JournalPaperDTO(Long studentId, String title, String journalName, String publisher, String issn,
                           Double impactFactor, Integer year, Integer volume, Integer issue, String pageNumbers, 
                           String doi, String url, String description, String abstractText, String author) {
        this.studentId = studentId;
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

    public JournalPaperDTO(String title, String journalName, String publisher, String issn, Double impactFactor,
                            Integer year, Integer volume, Integer issue, String pageNumbers, String doi, 
                            String url, String description, String abstractText, String author) {
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
}
