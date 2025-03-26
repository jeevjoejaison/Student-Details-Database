package com.verilag.student_details_database.services.forms;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.verilag.student_details_database.models.externalrepo.FacultyJournalPaper;
import com.verilag.student_details_database.models.formModels.JournalPaper;
import com.verilag.student_details_database.models.formModels.dtos.JournalPaperDTO;
import com.verilag.student_details_database.repository.externalrepo.FacultyJournalPaperRepository;
import com.verilag.student_details_database.repository.formRepos.JournalPaperRepository;

import jakarta.transaction.Transactional;

@Service
public class JournalPaperService {
    private final JournalPaperRepository repository;
    private final FacultyJournalPaperRepository fRepository;


    public JournalPaperService(JournalPaperRepository repository, FacultyJournalPaperRepository fRepository) {
        this.repository = repository;
        this.fRepository=fRepository;
    }

    @Transactional
    public JournalPaper saveJournalPaper(JournalPaperDTO dto) {
        System.out.println(dto);

        JournalPaper journalPaper = new JournalPaper();
        journalPaper.setStudentId(dto.getStudentId());
        journalPaper.setTitle(dto.getTitle());
        journalPaper.setJournalName(dto.getJournalName());
        journalPaper.setPublisher(dto.getPublisher());
        journalPaper.setISSN(dto.getIssn());
        journalPaper.setImpactFactor(dto.getImpactFactor());
        journalPaper.setYear(dto.getYear());
        journalPaper.setVolume(dto.getVolume());
        journalPaper.setIssue(dto.getIssue());
        journalPaper.setPageNumbers(dto.getPageNumbers());
        journalPaper.setDoi(dto.getDoi());
        journalPaper.setUrl(dto.getUrl());
        journalPaper.setDescription(dto.getDescription());
        journalPaper.setAbstractText(dto.getAbstractText());
        journalPaper.setAuthor(dto.getAuthor());
       
        return repository.save(journalPaper);
    }

    public List<JournalPaper> getPapersByStudent(Long studentId) {
        return repository.findByStudentId(studentId);
    }

    public void deletePaper(Long paperId) {
        if (!repository.existsById(paperId)) {
            throw new IllegalArgumentException("Journal Paper not found with ID: " + paperId);
        }
        repository.deleteById(paperId);
    }

    public List<JournalPaperDTO> searchByName(String query) {
        List<FacultyJournalPaper> papers = fRepository.findByJournalNameContainingIgnoreCase(query);
        return papers.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    private JournalPaperDTO convertToDTO(FacultyJournalPaper paper) {
        return new JournalPaperDTO(
            paper.getTitle(),
            paper.getJournalName(),
            paper.getPublisher(),
            paper.getISSN(),
            paper.getImpactFactor(),
            paper.getYear(),
            paper.getVolume(),
            paper.getIssue(),
            paper.getPageNumbers(),
            paper.getDoi(),
            paper.getUrl(),
            paper.getDescription(),
            paper.getAbstractText(),
            paper.getAuthor()
        );
    }
    

}
