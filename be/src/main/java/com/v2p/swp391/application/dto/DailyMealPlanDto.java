package com.v2p.swp391.application.dto;

import com.v2p.swp391.application.model.embeded.Nutrient;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DailyMealPlanDto {
    private List<MealDto> breakfast;
    private List<MealDto> lunch;
    private List<MealDto> dinner;
    private List<Nutrient> nutrients;
}
