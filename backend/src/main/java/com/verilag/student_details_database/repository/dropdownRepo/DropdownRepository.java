package com.verilag.student_details_database.repository.dropdownRepo;

import com.verilag.student_details_database.models.dropDownModel.DropdownModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DropdownRepository extends JpaRepository<DropdownModel, Long> {
    List<DropdownModel> findByCategoryAndDropdownName(String category, String dropdownName);
}
