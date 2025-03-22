package com.verilag.student_details_database.models.formModels.dtos;

import java.time.LocalDate;
import org.springframework.web.multipart.MultipartFile;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PlacementDTO {
    private Long studentId;
    private String company;
    private String role;
    private String location;
    private boolean coreJob;
    private LocalDate joiningDate;
    private String ctc;
    private String hiringMode;
    private MultipartFile offerLetter; // File upload
    private String description;
}
