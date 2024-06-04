package com.v2p.swp391.application.repository;

import com.v2p.swp391.application.model.RecipeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecipeRepository extends JpaRepository<RecipeEntity, Long> {

    List<RecipeEntity> findByCuisinesIn(List<String> cuisines);

    List<RecipeEntity> findByDishTypesIn(List<String> dishTypes);

    List<RecipeEntity> findByDietsIn(List<String> diets);

    List<RecipeEntity> findByOccasionsIn(List<String> occasions);

}
