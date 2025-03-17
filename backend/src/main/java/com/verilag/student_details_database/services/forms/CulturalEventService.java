package com.verilag.student_details_database.services.forms;

import java.io.IOException;
import java.util.List;

import org.springframework.stereotype.Service;

import com.verilag.student_details_database.models.formModels.CulturalEventModel;
import com.verilag.student_details_database.models.formModels.dtos.CulturalEventDTO;
import com.verilag.student_details_database.repository.formRepos.CulturalEventRepository;

import jakarta.transaction.Transactional;

@Service
public class CulturalEventService {
    private final CulturalEventRepository repository;

    public CulturalEventService(CulturalEventRepository repository) {
        this.repository = repository;
    }

    @Transactional
    public CulturalEventModel saveEvent(CulturalEventDTO dto) throws IOException{

       
            CulturalEventModel culturalEvent=new CulturalEventModel();
            culturalEvent.setAwards(dto.getAwards());
            culturalEvent.setCategory(dto.getCategory());
            culturalEvent.setDate(dto.getDate());
            culturalEvent.setDescription(dto.getDescription());
            culturalEvent.setEventName(dto.getEventName());
            culturalEvent.setLocation(dto.getLocation());
            if(dto.getProof()!=null)
                culturalEvent.setProof(dto.getProof().getBytes());
        
            return repository.save(culturalEvent);
    }

    public List<CulturalEventModel> getAllEvents(){
        return repository.findAll();
    }
}
