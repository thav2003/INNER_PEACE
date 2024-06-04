package com.v2p.swp391.application.controller;

import com.v2p.swp391.application.model.RecipeEntity;
import com.v2p.swp391.application.service.RecipeService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@AllArgsConstructor
@RestController
@RequestMapping("${app.api.version.v1}/recipes")
public class RecipeController {
    private final RecipeService recipeService;


    @PostMapping
    public RecipeEntity createRecipe(@RequestBody RecipeEntity recipeEntity) {
        return recipeService.createRecipe(recipeEntity);
    }

    @GetMapping("/{id}")
    public RecipeEntity getRecipeById(@PathVariable Long id) {
        return recipeService.getRecipeById(id);
    }

    @GetMapping
    public List<RecipeEntity> getAllRecipes() {
        return recipeService.getAllRecipes();
    }

    @GetMapping("/search")
    public List<RecipeEntity> searchRecipes(@RequestParam(required = false) String cuisines,
                                            @RequestParam(required = false) String dishTypes,
                                            @RequestParam(required = false) String diets,
                                            @RequestParam(required = false) String occasions) {
        // Handle empty search parameters
        if (cuisines == null && dishTypes == null && diets == null && occasions == null) {
            return recipeService.getAllRecipes();
        }

        // Build search criteria based on provided parameters
        List<String> searchCuisines = cuisines != null ? List.of(cuisines.split(",")) : null;
        List<String> searchDishTypes = dishTypes != null ? List.of(dishTypes.split(",")) : null;
        List<String> searchDiets = diets != null ? List.of(diets.split(",")) : null;
        List<String> searchOccasions = occasions != null ? List.of(occasions.split(",")) : null;

        return recipeService.findRecipesByCuisines(searchCuisines)
                .stream()
                .filter(recipe -> searchDishTypes == null || searchDishTypes.containsAll(recipe.getDishTypes()))
                .filter(recipe -> searchDiets == null || searchDiets.containsAll(recipe.getDiets()))
                .filter(recipe -> searchOccasions == null || searchOccasions.containsAll(recipe.getOccasions()))
                .toList();
    }

    @PutMapping("/{id}")
    public RecipeEntity updateRecipe(@PathVariable Long id, @RequestBody RecipeEntity recipeEntity) {
        recipeEntity.setId(id); // Ensure update happens on the correct recipe
        return recipeService.updateRecipe(recipeEntity);
    }

    @DeleteMapping("/{id}")
    public void deleteRecipeById(@PathVariable Long id) {
        recipeService.deleteRecipeById(id);
    }
}
