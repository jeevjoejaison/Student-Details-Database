package com.verilag.student_details_database.models.formModels;

import jakarta.persistence.Entity;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class ResearchPaper extends Activity {
    
    @NotBlank(message = "Author name is required")
    private String author;

    @NotNull(message = "Year is required")
    @Min(value = 1900, message = "Year must be after 1900")
    private Integer year;

    private String doi;

    @Size(max = 255, message = "URL cannot exceed 255 characters")
    private String url; // Made optional by removing @NotBlank

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Abstract is required")
    private String abstractText;
}