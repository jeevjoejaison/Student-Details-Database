package com.verilag.student_details_database.services.management;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.verilag.student_details_database.models.Student;
import com.verilag.student_details_database.models.authModels.dtos.StudentRegistrationRequest;
import com.verilag.student_details_database.models.Role;
import com.verilag.student_details_database.models.FA;
import com.verilag.student_details_database.repository.StudentRepository;
import com.verilag.student_details_database.services.authServices.AuthenticationService;

import jakarta.transaction.Transactional;

@Service
public class StudentServices {
    
    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private AuthenticationService authenticationService;

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public Student createStudent(Student student) {
        return studentRepository.save(student);
    }
    @Transactional
    public void createStudentsFromExcel(MultipartFile file) throws IOException {

        try (InputStream inputStream = file.getInputStream()) {
            Workbook workbook = new XSSFWorkbook(inputStream);
            Sheet sheet = workbook.getSheetAt(0);
            
            // Start from row 1 to skip the header row
            for (int i = 1; i <= sheet.getLastRowNum(); i++) {
                Row row = sheet.getRow(i);
                if (row == null) continue; // Skip empty rows

                // Create a new Student object
                StudentRegistrationRequest student = new StudentRegistrationRequest();
                student.setName(getCellValueAsString(row.getCell(0))); // Column 1: Name
                student.setEmail(getCellValueAsString(row.getCell(1))); // Column 2: Email
                student.setRollNumber(getCellValueAsString(row.getCell(2))); // Column 3: Roll Number
                student.setDepartment(getCellValueAsString(row.getCell(3))); // Column 4: Department
                student.setSection(getCellValueAsString(row.getCell(4))); // Column 5: Section
                student.setPassword(getCellValueAsString(row.getCell(5))); // Column 6: Password
                System.out.println(row.getCell(6));
                student.setFaEmail(getCellValueAsString(row.getCell(6)));
                
                // Register the student using AuthenticationService
                authenticationService.registerStudent(student);
            }
        }
    }

    @Transactional
public void bulkDeactivateStudents(MultipartFile file) throws IOException {
    List<String> emails = readEmailsFromExcel(file);
    
    for (String email : emails) {
        Student student = studentRepository.findByEmail(email.trim());
        if (student != null) {
            student.setActive(false);
            studentRepository.save(student);
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

    // Helper method to safely get cell value as String
    private String getCellValueAsString(Cell cell) {
        if (cell == null) {
            return ""; // Return empty string if the cell is null
        }
        return cell.getStringCellValue();
    }

    public List<Student> getStudentsByDepartmentAndYear(String department, int year) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getStudentsByDepartmentAndYear'");
    }

    public List<Student> getStudentsByDepartmentAndYear(String department, String rollNumberPrefix) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getStudentsByDepartmentAndYear'");
    }

    
    public void deactivateStudent(String email) {
        Student student = studentRepository.findByEmail(email);
        if (student != null) {
            student.setActive(false);
            studentRepository.save(student);
        } else {
            throw new RuntimeException("Student not found with email: " + email);
        }
    }
    
}