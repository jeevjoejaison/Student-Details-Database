package com.verilag.student_details_database.services.forms;

import java.io.IOException;
import java.util.List;
import org.springframework.stereotype.Service;
import com.verilag.student_details_database.models.formModels.PlacementModel;
import com.verilag.student_details_database.models.formModels.dtos.PlacementDTO;
import com.verilag.student_details_database.repository.formRepos.PlacementRepository;

import jakarta.transaction.Transactional;

@Service
public class PlacementService {
    private final PlacementRepository repository;

    public PlacementService(PlacementRepository repository) {
        this.repository = repository;
    }

    @Transactional
    public PlacementModel savePlacement(PlacementDTO dto) throws IOException {
        PlacementModel placement = new PlacementModel();
        placement.setCompany(dto.getCompany());
        placement.setRole(dto.getRole());
        placement.setLocation(dto.getLocation());
        placement.setCoreJob(dto.isCoreJob());
        placement.setJoiningDate(dto.getJoiningDate());
        placement.setCtc(dto.getCtc());
        placement.setHiringMode(dto.getHiringMode());
        placement.setOfferLetter(dto.getOfferLetter().getBytes());

        return repository.save(placement);
    }

    public List<PlacementModel> getAllPlacements() {
        return repository.findAll();
    }
}
