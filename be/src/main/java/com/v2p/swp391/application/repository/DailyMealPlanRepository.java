package com.v2p.swp391.application.repository;

import com.v2p.swp391.application.model.DailyMealPlanEntity;
import com.v2p.swp391.application.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface DailyMealPlanRepository extends JpaRepository<DailyMealPlanEntity, Long> {
    Optional<DailyMealPlanEntity> findByDate(LocalDate date);
    List<DailyMealPlanEntity> findByUserId(Long userId);
    List<DailyMealPlanEntity> findByUserIdAndDate(Long userId, LocalDate date);
    List<DailyMealPlanEntity> findByUserIdAndDateBetween(Long userId, LocalDate startDate, LocalDate endDate);

}