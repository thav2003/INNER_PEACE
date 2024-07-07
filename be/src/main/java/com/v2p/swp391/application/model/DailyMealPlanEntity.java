package com.v2p.swp391.application.model;

import com.v2p.swp391.application.model.embeded.Nutrient;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "daily_meal_plans")
public class DailyMealPlanEntity extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;

    private String slot;

    @OneToMany(mappedBy = "dailyMealPlan",cascade = { CascadeType.ALL },orphanRemoval = true)
    private List<MealEntity> meals;

    @ElementCollection
    @JoinTable(name = "nutrients", joinColumns = @JoinColumn(name = "nutrition_id"))
    private List<Nutrient> nutrients;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;
}
