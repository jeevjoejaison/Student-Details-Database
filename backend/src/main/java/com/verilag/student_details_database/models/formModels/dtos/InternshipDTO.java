package com.verilag.student_details_database.models.formModels.dtos;

import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;

import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class InternshipDTO {
    private Long studentId;
    private String company;
    private String role;
    private String location;
    private LocalDate startDate;
    private LocalDate endDate;
    private Double stipend;
    private String description;
    private MultipartFile offerLetter;
    private String proofBase64;
}
