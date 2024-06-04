package com.v2p.swp391.data;

import com.v2p.swp391.application.model.RecipeEntity;
import com.v2p.swp391.application.repository.RecipeRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DatabaseInitializerService {
    @Autowired
    private RecipeRepository recipeRepository;

    @PostConstruct
    public void init() {
//        for (int i = 1; i <= 10; i++) { // Generate 10 fake recipes
//            RecipeEntity recipe = FakeRecipeDataGenerator.generateFakeRecipe(i);
//            recipeRepository.save(recipe);
//        }
    }
}
