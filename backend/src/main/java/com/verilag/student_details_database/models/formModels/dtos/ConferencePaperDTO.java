package com.verilag.student_details_database.models.formModels.dtos;

import lombok.*;
import jakarta.validation.constraints.*;
import java.time.LocalDate;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ConferencePaperDTO {
    
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

    @NotNull(message = "Acceptance rate is required")
    private Double acceptanceRate;

    @NotNull(message = "Start date is required")
    private LocalDate startDate;

    @NotNull(message = "End date is required")
    private LocalDate endDate;

    @NotBlank(message = "DOI is required")
    private String doi;

    @NotBlank(message = "URL is required")
    private String url;

    @NotBlank(message = "Abstract is required")
    private String abstractText;

    @NotBlank(message = "Description is required")
    private String description;

    // Correct constructor implementation
    public ConferencePaperDTO(Long studentId, String title, String conferenceName, String location,
                              String organizer, Double acceptanceRate, LocalDate startDate, LocalDate endDate,
                              String doi, String url, String abstractText, String description,
                              String author, Integer year) {
        this.studentId = studentId;
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
}
