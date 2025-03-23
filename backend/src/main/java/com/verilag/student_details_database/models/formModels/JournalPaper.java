package com.verilag.student_details_database.models.formModels;

import jakarta.persistence.Entity;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
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
}
