package com.verilag.student_details_database.services.forms;
import org.springframework.stereotype.Service;

import com.verilag.student_details_database.models.formModels.Internship;

import com.verilag.student_details_database.models.formModels.dtos.InternshipDTO;
import com.verilag.student_details_database.repository.formRepos.InternshipRepository;

import jakarta.transaction.Transactional;

import java.io.IOException;
import java.util.List;

@Service
public class InternshipService {

    
    private final InternshipRepository repository;
    

    public InternshipService(InternshipRepository repository) {
        this.repository = repository;
    }

    @Transactional
    public Internship saveinternship(InternshipDTO dto) throws IOException {
        Internship internship = new Internship();
        internship.setCompany(dto.getCompany());
        internship.setRole(dto.getRole());
        internship.setLocation(dto.getLocation());
        internship.setStartDate(dto.getStartDate());
        internship.setStipend(dto.getStipend());
        internship.setDescription(dto.getDescription());
        internship.setEndDate(dto.getEndDate());
        internship.setOfferLetter(dto.getOfferLetter().getBytes());
        return repository.save(internship);
    }

    public List<Internship> getAllinternships() {
        return repository.findAll();
    }
}
