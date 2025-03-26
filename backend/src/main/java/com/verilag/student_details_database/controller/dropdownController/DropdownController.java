package com.verilag.student_details_database.controller.dropdownController;

import com.verilag.student_details_database.models.dropDownModel.DropdownModel;
import com.verilag.student_details_database.models.dropDownModel.dto.DropdownDTO;
import com.verilag.student_details_database.services.dropdown.DropdownService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/dropdown")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174", "http://localhost:5175"}) 
public class DropdownController {

    @Autowired
    private DropdownService dropdownService;

    // Add a dropdown option (Request body)
    @PostMapping("/add")
    public ResponseEntity<DropdownModel> addDropdownOption(@RequestBody DropdownDTO dropdownDTO) {
        DropdownModel createdOption = dropdownService.addDropdownOption(dropdownDTO);
        return ResponseEntity.ok(createdOption);
    }

    // Delete a dropdown option (ID in params)
    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteDropdownOption(@RequestParam Long id) {
        dropdownService.deleteDropdownOption(id);
        return ResponseEntity.ok("Dropdown option deleted successfully.");
    }

    // Fetch dropdown options by category and dropdownName (Use request params)
    @GetMapping("/fetch")
    public ResponseEntity<List<DropdownModel>> getDropdownOptions(
            @RequestParam String category, 
            @RequestParam String dropdownName) {
        List<DropdownModel> dropdownOptions = dropdownService.getDropdownOptions(category, dropdownName);
        return ResponseEntity.ok(dropdownOptions);
    }
}
