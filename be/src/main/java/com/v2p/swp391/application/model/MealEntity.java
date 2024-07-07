package com.v2p.swp391.application.model;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "meals")
public class MealEntity extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long meal_id;
    private String name;
    private Integer quantity;
    private String unit;
    private String typeFood;
    @ManyToOne
    @JoinColumn(name = "daily_meal_plan_id", nullable = false)
    private DailyMealPlanEntity dailyMealPlan;
}
