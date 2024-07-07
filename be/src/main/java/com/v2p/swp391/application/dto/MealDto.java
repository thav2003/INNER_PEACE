package com.v2p.swp391.application.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MealDto {
    private Long id;
    private Long meal_id;
    private String name;
    private Integer quantity;
    private String unit;
    private String typeFood;
}
