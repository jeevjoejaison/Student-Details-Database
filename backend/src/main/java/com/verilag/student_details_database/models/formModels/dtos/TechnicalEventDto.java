package com.verilag.student_details_database.models.formModels.dtos;

import java.time.LocalDate;
import org.springframework.web.multipart.MultipartFile;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TechnicalEventDto {
    private String eventName;
    private String category;
    private String location;
    private LocalDate date;
    private String awards;
    private String description;
    private MultipartFile proof; // File upload
    private String proofBase64;
}
