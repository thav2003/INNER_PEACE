package com.v2p.swp391.application.model;

import com.v2p.swp391.application.model.embeded.*;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "recipes")
public class RecipeEntity extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private Integer readyInMinutes;
    private Integer servings;
    private String sourceUrl;
    private String image;
    private String imageType;
    @Embedded
    private Nutrition nutrition;

    @Column(columnDefinition = "TEXT")
    private String summary;

    @ElementCollection
    @JoinTable(name = "recipe_cuisines",
            joinColumns = @JoinColumn(name = "recipe_id"))
    @Column(length = 50)
    private List<String> cuisines;

    @ElementCollection
    @JoinTable(name = "recipe_dish_types",
            joinColumns = @JoinColumn(name = "recipe_id"))
    @Column(length = 50)
    private List<String> dishTypes;

    @ElementCollection
    @JoinTable(name = "recipe_diets",
            joinColumns = @JoinColumn(name = "recipe_id"))
    @Column(length = 50)
    private List<String> diets;

    @ElementCollection
    @JoinTable(name = "recipe_occasions",
            joinColumns = @JoinColumn(name = "recipe_id"))
    @Column(length = 50)
    private List<String> occasions;

    @Column(columnDefinition = "TEXT")
    private String instructions;

    @OneToMany(cascade = CascadeType.ALL,orphanRemoval = true)
    @JoinTable(name = "recipe_instructions",
            joinColumns = @JoinColumn(name = "recipe_id"))
    private List<InstructionEntity> analyzedInstructions;
}

