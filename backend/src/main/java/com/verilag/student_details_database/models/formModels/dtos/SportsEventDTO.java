package com.verilag.student_details_database.models.formModels.dtos;


import java.time.LocalDate;
import org.springframework.web.multipart.MultipartFile;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SportsEventDTO {
    private String eventName;
    private String participationType;
    private String location;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate date;

    private String awards;
    private String description;
    private MultipartFile proof;
    private String proofBase64;
}
