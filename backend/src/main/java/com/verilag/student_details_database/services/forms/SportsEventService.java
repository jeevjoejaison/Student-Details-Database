package com.verilag.student_details_database.services.forms;

import java.io.IOException;
import java.util.List;

import org.springframework.stereotype.Service;
import com.verilag.student_details_database.models.formModels.SportsEventModel;
import com.verilag.student_details_database.models.formModels.dtos.SportsEventDTO;
import com.verilag.student_details_database.repository.formRepos.SportsEventRepository;

import jakarta.transaction.Transactional;

@Service
public class SportsEventService {
    private final SportsEventRepository repository;

    public SportsEventService(SportsEventRepository repository) {
        this.repository = repository;
    }

    @Transactional
    public SportsEventModel saveEvent(SportsEventDTO dto) throws IOException {
        SportsEventModel sportsEvent = new SportsEventModel();
        sportsEvent.setAwards(dto.getAwards());
        sportsEvent.setParticipationType(dto.getParticipationType());
        sportsEvent.setDate(dto.getDate());
        sportsEvent.setDescription(dto.getDescription());
        sportsEvent.setEventName(dto.getEventName());
        sportsEvent.setLocation(dto.getLocation());
        sportsEvent.setProof(dto.getProof().getBytes());

        return repository.save(sportsEvent);
    }

    public List<SportsEventModel> getAllEvents() {
        return repository.findAll();
    }
}
