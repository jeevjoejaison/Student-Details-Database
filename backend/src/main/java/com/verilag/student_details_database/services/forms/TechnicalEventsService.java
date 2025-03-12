package com.verilag.student_details_database.services.forms;


import java.io.IOException;
import java.util.List;
import org.springframework.stereotype.Service;
import com.verilag.student_details_database.models.formModels.TechnicalEventModel;
import com.verilag.student_details_database.models.formModels.dtos.TechnicalEventDto;
import com.verilag.student_details_database.repository.formRepos.TechnicalEventRepository;
import jakarta.transaction.Transactional;

@Service
public class TechnicalEventsService {
    private final TechnicalEventRepository repository;

    public TechnicalEventsService(TechnicalEventRepository repository) {
        this.repository = repository;
    }

    @Transactional
    public TechnicalEventModel saveEvent(TechnicalEventDto dto) throws IOException {
        TechnicalEventModel technicalEvent = new TechnicalEventModel();
        technicalEvent.setAwards(dto.getAwards());
        technicalEvent.setCategory(dto.getCategory());
        technicalEvent.setDate(dto.getDate());
        technicalEvent.setDescription(dto.getDescription());
        technicalEvent.setEventName(dto.getEventName());
        technicalEvent.setLocation(dto.getLocation());
        technicalEvent.setProof(dto.getProof().getBytes());

        return repository.save(technicalEvent);
    }

    public List<TechnicalEventModel> getAllEvents() {
        return repository.findAll();
    }
}