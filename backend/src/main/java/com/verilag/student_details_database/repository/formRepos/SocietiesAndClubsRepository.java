package com.verilag.student_details_database.repository.formRepos;

import org.springframework.data.jpa.repository.JpaRepository;
import com.verilag.student_details_database.models.formModels.SocietiesAndClubsModel;

public interface SocietiesAndClubsRepository extends JpaRepository<SocietiesAndClubsModel, Long> {
}
