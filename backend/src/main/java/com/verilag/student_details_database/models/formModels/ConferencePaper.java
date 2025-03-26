package com.verilag.student_details_database.models.formModels;

import jakarta.persistence.Entity;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;

@Getter
@Setter
@Entity
public class ConferencePaper extends ResearchPaper {
    
    @NotBlank(message = "Conference name is required")
    private String conferenceName;

    @NotBlank(message = "Location is required")
    private String location;

    @NotBlank(message = "Organizer is required")
    private String organizer;

    @NotNull(message = "Acceptance rate is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Acceptance rate must be greater than 0")
    @DecimalMax(value = "100.0", message = "Acceptance rate cannot exceed 100")
    private Double acceptanceRate;

    @NotNull(message = "Start date is required")
    private LocalDate startDate;

    @NotNull(message = "End date is required")
    private LocalDate endDate;

    
}
