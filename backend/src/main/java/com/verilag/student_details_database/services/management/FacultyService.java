package com.verilag.student_details_database.services.management;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.verilag.student_details_database.models.FA;
import com.verilag.student_details_database.models.Role;
import com.verilag.student_details_database.repository.FARepository;
import com.verilag.student_details_database.services.authServices.AuthenticationService;

import jakarta.transaction.Transactional;

@Service
public class FacultyService {
    @Autowired
    private FARepository facultyRepository;

    @Autowired
    private AuthenticationService authenticationService;

    public List<FA> getAllFaculties() {
        return facultyRepository.findAll();
    }

    public interface Facultyservice {
        List<FA> getFacultiesByDepartment(String department);
    }

    public FA createFaculty(FA faculty) {
        return facultyRepository.save(faculty);
    }

    public void createFacultiesFromExcel(MultipartFile file) throws IOException {
        List<FA> faculties = new ArrayList<>();
        try (InputStream inputStream = file.getInputStream()) {
            Workbook workbook = new XSSFWorkbook(inputStream);
            org.apache.poi.ss.usermodel.Sheet sheet = workbook.getSheetAt(0);
            for (Row row : sheet) {
                if (row == null) continue;
                if (row.getRowNum() == 0) continue; // Skip header row
                
                FA faculty = new FA();
                faculty.setName(row.getCell(0).getStringCellValue());
                faculty.setEmail(row.getCell(1).getStringCellValue());
                faculty.setFaDepartment(row.getCell(2).getStringCellValue());
                faculty.setPassword(row.getCell(3).getStringCellValue());
                faculty.setRole(Role.FA);

                // Register the faculty using AuthenticationService
                authenticationService.registerFA(faculty);
            }
        }
    }

    public List<FA> getFacultiesByDepartment(String department) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getFacultiesByDepartment'");
    }

    public void deactivateUser(String email) {
        Optional<FA> opFa = facultyRepository.findByEmail(email);
        FA user=opFa.get();
        if (user != null) {
            user.setActive(false);
            facultyRepository.save(user);
        } else {
            throw new RuntimeException("User not found with email: " + email);
        }
    }

    @Transactional
    public void bulkDeactivateFaculties(MultipartFile file) throws IOException {
    List<String> emails = readEmailsFromExcel(file);
    
    for (String email : emails) {
        Optional<FA> optionalFaculty = facultyRepository.findByEmail(email.trim());
        if (optionalFaculty.isPresent()) {
            FA faculty = optionalFaculty.get();
            faculty.setActive(false);
            facultyRepository.save(faculty);
        }
    }
}

    private List<String> readEmailsFromExcel(MultipartFile file) throws IOException {
    List<String> emails = new ArrayList<>();
    
    try (InputStream inputStream = file.getInputStream()) {
        Workbook workbook = new XSSFWorkbook(inputStream);
        Sheet sheet = workbook.getSheetAt(0);

        // Assuming first column contains emails
        for (int i = 0; i <= sheet.getLastRowNum(); i++) {
            Row row = sheet.getRow(i);
            if (row == null) continue;

            Cell cell = row.getCell(0); // First column
            if (cell != null) {
                String email = cell.getStringCellValue().trim();
                if (!email.isEmpty()) {
                    emails.add(email);
                }
            }
        }
    }
    
    return emails;
}
    
}