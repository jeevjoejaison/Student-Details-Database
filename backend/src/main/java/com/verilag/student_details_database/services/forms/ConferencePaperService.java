package com.verilag.student_details_database.services.forms;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.verilag.student_details_database.models.formModels.ConferencePaper;
import com.verilag.student_details_database.models.formModels.CulturalEventModel;
import com.verilag.student_details_database.models.formModels.dtos.ConferencePaperDTO;
import com.verilag.student_details_database.repository.formRepos.ConferencePaperRepository;

import jakarta.validation.Valid;

@Service
public class ConferencePaperService {
    private final ConferencePaperRepository repository;

    public ConferencePaperService(ConferencePaperRepository repository) {
        this.repository = repository;
    }

    @Transactional
    public ConferencePaper saveConferencePaper(@Valid ConferencePaperDTO dto) {
        System.out.println("Saving Conference Paper: " + dto);

        ConferencePaper conferencePaper = new ConferencePaper();
        conferencePaper.setStudentId(dto.getStudentId());
        conferencePaper.setTitle(dto.getTitle());
        conferencePaper.setConferenceName(dto.getConferenceName());
        conferencePaper.setLocation(dto.getLocation());
        conferencePaper.setOrganizer(dto.getOrganizer());
        conferencePaper.setAcceptanceRate(dto.getAcceptanceRate());
        conferencePaper.setStartDate(dto.getStartDate());
        conferencePaper.setEndDate(dto.getEndDate());
        conferencePaper.setDoi(dto.getDoi());
        conferencePaper.setUrl(dto.getUrl());
        conferencePaper.setAbstractText(dto.getAbstractText());
        conferencePaper.setDescription(dto.getDescription());
        conferencePaper.setAuthor(dto.getAuthor());
        conferencePaper.setYear(dto.getYear());
        return repository.save(conferencePaper);
    }


    @Transactional
    public void deletePaper(Long paperId) {
        if (!repository.existsById(paperId)) {
            throw new IllegalArgumentException("Conference Paper not found with ID: " + paperId);
        }
        repository.deleteById(paperId);
    }

    public List<ConferencePaperDTO> searchByName(String query) {
        List<ConferencePaper> papers = repository.findByConferenceNameContainingIgnoreCase(query);
        return papers.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    private ConferencePaperDTO convertToDTO(ConferencePaper paper) {
        return new ConferencePaperDTO(
            paper.getStudentId(),
            paper.getTitle(),
            paper.getConferenceName(),
            paper.getLocation(),
            paper.getOrganizer(),
            paper.getAcceptanceRate(),
            paper.getStartDate(),
            paper.getEndDate(),
            paper.getDoi(),
            paper.getUrl(),
            paper.getAbstractText(),
            paper.getDescription(),
            paper.getAuthor(),
            paper.getYear()
        );
    }



    public List<ConferencePaper> getConferencePapers(Long studentId) {
        return repository.findByStudentId(studentId);
    }

}
