package com.verilag.student_details_database.models.formModels.dtos;

import org.springframework.web.multipart.MultipartFile;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SocietiesAndClubsDTO {
    private String name;
    private String category;
    private String membershipType;
    private MultipartFile proof; // File upload
    private String proofBase64;
}
