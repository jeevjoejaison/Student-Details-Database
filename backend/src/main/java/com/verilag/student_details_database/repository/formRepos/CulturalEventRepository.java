package com.verilag.student_details_database.repository.formRepos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.verilag.student_details_database.models.formModels.CulturalEventModel;

public interface CulturalEventRepository extends JpaRepository<CulturalEventModel,Long>{

}
