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
