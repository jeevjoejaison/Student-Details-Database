package com.verilag.student_details_database.models.formModels;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

import org.springframework.web.multipart.MultipartFile;

@Entity
@Table(name = "internships")
@Getter
@Setter
public class Internship extends JobModel {
    private LocalDate startDate;
    private LocalDate endDate;
    private Double stipend;
    public void setOfferLetter(MultipartFile offerLetter) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'setOfferLetter'");
    }
}
