package com.verilag.student_details_database.repository.formRepos;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.verilag.student_details_database.models.formModels.TechnicalEventModel;

@Repository
public interface TechnicalEventRepository extends JpaRepository<TechnicalEventModel, Long> {
}
