package com.v2p.swp391.application.service;

import com.v2p.swp391.application.model.RecipeEntity;
import com.v2p.swp391.application.repository.RecipeRepository;
import com.v2p.swp391.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RecipeService {

    private final RecipeRepository recipeRepository;

    public RecipeEntity createRecipe(RecipeEntity recipeEntity) {
        return recipeRepository.save(recipeEntity);
    }

    public RecipeEntity getRecipeById(Long id) {
        return recipeRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Recipe","id",id));
    }

    public List<RecipeEntity> getAllRecipes() {
        return recipeRepository.findAll();
    }

    public List<RecipeEntity> findRecipesByCuisines(List<String> cuisines) {
        return recipeRepository.findByCuisinesIn(cuisines);
    }

    public List<RecipeEntity> findRecipesByDishTypes(List<String> dishTypes) {
        return recipeRepository.findByDishTypesIn(dishTypes);
    }

    public List<RecipeEntity> findRecipesByDiets(List<String> diets) {
        return recipeRepository.findByDietsIn(diets);
    }

    public List<RecipeEntity> findRecipesByOccasions(List<String> occasions) {
        return recipeRepository.findByOccasionsIn(occasions);
    }

    public RecipeEntity updateRecipe(RecipeEntity recipeEntity) {
        return recipeRepository.save(recipeEntity);
    }

    public void deleteRecipeById(Long id) {
        recipeRepository.deleteById(id);
    }
}
