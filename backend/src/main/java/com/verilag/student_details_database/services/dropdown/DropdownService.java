package com.verilag.student_details_database.services.dropdown;

import com.verilag.student_details_database.models.dropDownModel.DropdownModel;
import com.verilag.student_details_database.models.dropDownModel.dto.DropdownDTO;
import com.verilag.student_details_database.repository.dropdownRepo.DropdownRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DropdownService {

    @Autowired
    private DropdownRepository dropdownRepository;

    // Add a new dropdown option
    public DropdownModel addDropdownOption(DropdownDTO dropdownDTO) {
        DropdownModel newOption = new DropdownModel(
                dropdownDTO.getCategory(), 
                dropdownDTO.getDropdownName(), 
                dropdownDTO.getOptionValue()
        );
        return dropdownRepository.save(newOption);
    }

    // Delete a dropdown option by ID
    public void deleteDropdownOption(Long id) {
        dropdownRepository.deleteById(id);
    }

    // Fetch dropdown options by category and dropdownName
    public List<DropdownModel> getDropdownOptions(String category, String dropdownName) {
        return dropdownRepository.findByCategoryAndDropdownName(category, dropdownName);
    }
}
