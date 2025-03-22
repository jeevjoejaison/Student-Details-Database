package com.verilag.student_details_database.models.formModels.dtos;


import java.time.LocalDate;
import org.springframework.web.multipart.MultipartFile;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SportsEventDTO {
    private Long studentId;
    private String eventName;
    private String participationType;
    private String location;
    private LocalDate date;
    private String awards;
    private String description;
    private MultipartFile proof;
    private String proofBase64;
}
