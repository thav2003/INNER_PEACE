package com.v2p.swp391.application.controller;

import com.v2p.swp391.application.model.DailyMealPlanEntity;
import com.v2p.swp391.application.dto.DailyMealPlanDto;
import com.v2p.swp391.application.dto.MealDto;
import com.v2p.swp391.application.model.embeded.Nutrient;
import com.v2p.swp391.application.service.DailyMealPlanService;
import com.v2p.swp391.common.api.CoreApiResponse;
import com.v2p.swp391.common.swagger.DailyMealPlanOperation;
import com.v2p.swp391.utils.Helpers;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@AllArgsConstructor
@RestController
@RequestMapping("${app.api.version.v1}/daily-meal-plans")
@PreAuthorize("isAuthenticated()")
public class DailyMealPlanController {

    private DailyMealPlanService dailyMealPlanService;

    private ModelMapper modelMapper;

    @GetMapping("/summaryByMonth")
    public ResponseEntity<Map<String, Long>> getNutritionSummaryForCurrentMonth() {

        Map<String, Long> summary = dailyMealPlanService.getNutritionSummaryForCurrentMonth(Helpers.getUserFromAuth().getId());

        return ResponseEntity.ok(summary);
    }

    @PutMapping
    @DailyMealPlanOperation
    public CoreApiResponse<DailyMealPlanDto> updateDailyMealPlans(
            @Schema(example = "2024-07-03") @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
            @RequestBody DailyMealPlanDto request
    ){

        List<DailyMealPlanEntity> dailyMealPlans =dailyMealPlanService.updateDailyMealPlan(Helpers.getUserFromAuth().getId(),date,request);

        return CoreApiResponse.success(convertToDailyMealPlan(dailyMealPlans));
    }

    @GetMapping
    @DailyMealPlanOperation
    public CoreApiResponse<DailyMealPlanDto> getDailyMealPlansByUserAndDate(
           @Schema(example = "2024-07-03") @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {

        List<DailyMealPlanEntity> dailyMealPlans = dailyMealPlanService.getDailyMealPlansByUserAndDate(Helpers.getUserFromAuth().getId(), date);

        return CoreApiResponse.success(convertToDailyMealPlan(dailyMealPlans));
    }

    private DailyMealPlanDto convertToDailyMealPlan(List<DailyMealPlanEntity> dailyMealPlans){
        DailyMealPlanDto response = DailyMealPlanDto.builder()
                .breakfast(new ArrayList<>())
                .lunch(new ArrayList<>())
                .dinner(new ArrayList<>())
                .build();

        // Map meal entities to DTOs and categorize them by slot
        dailyMealPlans.forEach(plan -> {
            List<MealDto> mealResponses = plan.getMeals().stream()
                    .map(meal -> modelMapper.map(meal, MealDto.class))
                    .collect(Collectors.toList());
            response.setNutrients(plan.getNutrients());
            switch (plan.getSlot()) {
                case "BREAKFAST":
                    response.setBreakfast(mealResponses);
                    break;
                case "LUNCH":
                    response.setLunch(mealResponses);
                    break;
                case "DINNER":
                    response.setDinner(mealResponses);
                    break;
                default:
                    break;
            }
        });
        return response;
    }
}
