package com.v2p.swp391.application.model;

import com.v2p.swp391.application.model.embeded.Nutrient;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "ingredients")
public class IngredientEntity extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String localizedName;

    private String image;

    private double amount;

    private String unit;


    @ElementCollection
    @JoinTable(
            name = "ingredient_nutrient",
            joinColumns = @JoinColumn(name = "ingredient_id")
    )
    private List<Nutrient> nutrients;

    public IngredientEntity(String name, double amount, String unit, List<Nutrient> nutrients) {
        this.name = name;
        this.amount = amount;
        this.unit = unit;
        this.nutrients = nutrients;
    }

    public IngredientEntity(String name, String localizedName, String image) {
        this.name = name;
        this.localizedName = localizedName;
        this.image = image;
    }
}
