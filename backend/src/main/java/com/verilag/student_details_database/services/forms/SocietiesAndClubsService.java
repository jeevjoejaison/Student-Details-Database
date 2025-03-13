package com.verilag.student_details_database.services.forms;

import java.io.IOException;
import java.util.List;

import org.springframework.stereotype.Service;
import com.verilag.student_details_database.models.formModels.SocietiesAndClubsModel;
import com.verilag.student_details_database.models.formModels.dtos.SocietiesAndClubsDTO;
import com.verilag.student_details_database.repository.formRepos.SocietiesAndClubsRepository;

import jakarta.transaction.Transactional;

@Service
public class SocietiesAndClubsService {
    private final SocietiesAndClubsRepository repository;

    public SocietiesAndClubsService(SocietiesAndClubsRepository repository) {
        this.repository = repository;
    }

    @Transactional
    public SocietiesAndClubsModel saveSocietyOrClub(SocietiesAndClubsDTO dto) throws IOException {
        SocietiesAndClubsModel society = new SocietiesAndClubsModel();
        society.setName(dto.getName());
        society.setCategory(dto.getCategory());
        society.setMembershipType(dto.getMembershipType());
        society.setProof(dto.getProof().getBytes());

        return repository.save(society);
    }

    public List<SocietiesAndClubsModel> getAllSocietiesAndClubs() {
        return repository.findAll();
    }
}
