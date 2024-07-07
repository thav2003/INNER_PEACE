package com.v2p.swp391.application.service;

import com.v2p.swp391.application.dto.DailyMealPlanDto;
import com.v2p.swp391.application.dto.MealDto;
import com.v2p.swp391.application.model.DailyMealPlanEntity;
import com.v2p.swp391.application.model.MealEntity;
import com.v2p.swp391.application.model.UserEntity;
import com.v2p.swp391.application.model.embeded.Nutrient;
import com.v2p.swp391.application.repository.DailyMealPlanRepository;
import com.v2p.swp391.application.repository.MealRepository;
import com.v2p.swp391.application.repository.UserRepository;
import com.v2p.swp391.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DailyMealPlanService {

    private final ModelMapper modelMapper;
    private final DailyMealPlanRepository dailyMealPlanRepository;
    private final MealRepository mealRepository;
    private final UserRepository userRepository;

    public List<DailyMealPlanEntity> getAllDailyMealPlans() {
        return dailyMealPlanRepository.findAll();
    }

    public DailyMealPlanEntity getDailyMealPlanById(Long id) {
        return dailyMealPlanRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("DailyMealPlan", "id", id));
    }

    public DailyMealPlanEntity createDailyMealPlan(DailyMealPlanEntity dailyMealPlan) {
        return dailyMealPlanRepository.save(dailyMealPlan);
    }

    public List<DailyMealPlanEntity> updateDailyMealPlan(Long userId,LocalDate date, DailyMealPlanDto dto) {
        List<DailyMealPlanEntity> dailyMealPlans = dailyMealPlanRepository.findByUserIdAndDate(userId,date);

        if(dailyMealPlans.isEmpty()){
            UserEntity user = userRepository.findById(userId).orElseThrow(()->new ResourceNotFoundException("User","id", userId));
            DailyMealPlanEntity newDailyBF = new DailyMealPlanEntity();
            newDailyBF.setDate(date);
            newDailyBF.setUser(user);
            newDailyBF.setNutrients(dto.getNutrients());
            newDailyBF.setSlot("BREAKFAST");
            List<MealEntity> meals_breakfast = dto.getBreakfast().stream()
                    .map(meal -> {
                        MealEntity mEntity = modelMapper.map(meal, MealEntity.class);
                        mEntity.setMeal_id(meal.getId());
                        mEntity.setId(null);
                        mEntity.setDailyMealPlan(newDailyBF);
                        return mEntity;
                    })
                    .collect(Collectors.toList());
            newDailyBF.setMeals(meals_breakfast);
            dailyMealPlans.add(newDailyBF);

            DailyMealPlanEntity newDailyL = new DailyMealPlanEntity();
            newDailyL.setDate(date);
            newDailyL.setUser(user);
            newDailyL.setNutrients(dto.getNutrients());
            newDailyL.setSlot("BREAKFAST");
            List<MealEntity> meals_lunch = dto.getBreakfast().stream()
                    .map(meal -> {
                        MealEntity mEntity = modelMapper.map(meal, MealEntity.class);
                        mEntity.setDailyMealPlan(newDailyL);
                        mEntity.setMeal_id(meal.getId());
                        mEntity.setId(null);
                        return mEntity;
                    })
                    .collect(Collectors.toList());
            newDailyL.setMeals(meals_lunch);
            dailyMealPlans.add(newDailyL);


            DailyMealPlanEntity newDailyDN = new DailyMealPlanEntity();
            newDailyDN.setDate(date);
            newDailyDN.setUser(user);
            newDailyDN.setNutrients(dto.getNutrients());
            newDailyDN.setSlot("BREAKFAST");
            List<MealEntity> meals_dinner = dto.getBreakfast().stream()
                    .map(meal -> {
                        MealEntity mEntity = modelMapper.map(meal, MealEntity.class);
                        mEntity.setDailyMealPlan(newDailyDN);
                        mEntity.setMeal_id(meal.getId());
                        mEntity.setId(null);
                        return mEntity;
                    })
                    .collect(Collectors.toList());
            newDailyDN.setMeals(meals_dinner);
            dailyMealPlans.add(newDailyDN);
        }else{
            dailyMealPlans.forEach(plan->{
                plan.getMeals().clear();

                plan.setNutrients(dto.getNutrients());
                switch (plan.getSlot()) {
                    case "BREAKFAST":
                        List<MealEntity> meals_breakfast = dto.getBreakfast().stream()
                                .map(meal -> {
                                    MealEntity mEntity = modelMapper.map(meal, MealEntity.class);
                                    mEntity.setDailyMealPlan(plan);
                                    return mEntity;
                                })
                                .collect(Collectors.toList());
                        plan.getMeals().addAll(meals_breakfast);
                        break;
                    case "LUNCH":
                        List<MealEntity> meals_lunch = dto.getLunch().stream()
                                .map(meal -> {
                                    MealEntity mEntity = modelMapper.map(meal, MealEntity.class);
                                    mEntity.setDailyMealPlan(plan);
                                    return mEntity;
                                })
                                .collect(Collectors.toList());
                        plan.getMeals().addAll(meals_lunch);
                        break;
                    case "DINNER":
                        List<MealEntity> meals_dinner = dto.getDinner().stream()
                                .map(meal -> {
                                    MealEntity mEntity = modelMapper.map(meal, MealEntity.class);
                                    mEntity.setDailyMealPlan(plan);
                                    return mEntity;
                                })
                                .collect(Collectors.toList());
                        plan.getMeals().addAll(meals_dinner);
                        break;
                    default:
                        break;
                }
            });
        }



        return dailyMealPlanRepository.saveAll(dailyMealPlans);
    }

    public void deleteDailyMealPlan(Long id) {
        DailyMealPlanEntity dailyMealPlan = dailyMealPlanRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("DailyMealPlan","id", id));

        dailyMealPlanRepository.delete(dailyMealPlan);
    }

    public List<DailyMealPlanEntity> getDailyMealPlansByUserId(Long userId) {
        return dailyMealPlanRepository.findByUserId(userId);
    }
    public List<DailyMealPlanEntity> getDailyMealPlansByUserAndDate(Long userId, LocalDate date) {
        return dailyMealPlanRepository.findByUserIdAndDate(userId, date);
    }

    public Map<String, Long> getNutritionSummaryForCurrentMonth(Long userId) {
        LocalDate startDate = LocalDate.now().withDayOfMonth(1);
        LocalDate endDate = LocalDate.now().withDayOfMonth(
                LocalDate.now().lengthOfMonth());

        List<DailyMealPlanEntity> plans = dailyMealPlanRepository.findByUserIdAndDateBetween(userId, startDate, endDate);

        long daysBelow2000 = 0;
        long daysExactly2000 = 0;
        long daysAbove2000 = 0;

        Map<LocalDate, List<DailyMealPlanEntity>> groupedByDate = plans.stream()
                .collect(Collectors.groupingBy(DailyMealPlanEntity::getDate));

        for (LocalDate date : groupedByDate.keySet()) {
            DailyMealPlanEntity dailyPlans = groupedByDate.get(date).get(0);

            double totalCalories = dailyPlans.getNutrients().stream()
                    .filter(nutrient -> nutrient.getName().equalsIgnoreCase("Calories"))
                    .mapToDouble(Nutrient::getAmount)
                    .sum();

            if (totalCalories < 2000) {
                daysBelow2000++;
            } else if (totalCalories == 2000) {
                daysExactly2000++;
            } else {
                daysAbove2000++;
            }
        }


        // Prepare result map
        Map<String, Long> result = new HashMap<>();
        result.put("daysBelow2000", daysBelow2000);
        result.put("daysExactly2000", daysExactly2000);
        result.put("daysAbove2000", daysAbove2000);

        return result;
    }
}