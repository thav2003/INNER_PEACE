package com.v2p.swp391.application.model.embeded;

import com.v2p.swp391.application.model.IngredientEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class Nutrition {

    @ElementCollection
    @JoinTable(name = "nutrition_nutrients", joinColumns = @JoinColumn(name = "nutrition_id"))
    private List<Nutrient> nutrients;

    @ElementCollection
    @JoinTable(name = "nutrition_properties", joinColumns = @JoinColumn(name = "nutrition_id"))
    private List<Property> properties;

    @ElementCollection
    @JoinTable(name = "nutrition_flavonoids", joinColumns = @JoinColumn(name = "nutrition_id"))
    private List<Flavonoid> flavonoids;

    @OneToMany(cascade = CascadeType.ALL,orphanRemoval = true)
    @JoinTable(name = "nutrition_ingredients", joinColumns = @JoinColumn(name = "nutrition_id"))
    private List<IngredientEntity> ingredients;

    private CaloricBreakdown caloricBreakdown;

    private WeightPerServing weightPerServing;

}
