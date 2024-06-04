package com.v2p.swp391.application.model;

import com.v2p.swp391.application.model.embeded.Equipment;
import com.v2p.swp391.application.model.embeded.InstructionDuration;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "instructions")
public class InstructionEntity extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer number;

    @Column(columnDefinition = "TEXT")
    private String step;

    @OneToMany(cascade = CascadeType.ALL,orphanRemoval = true)
    @JoinTable(name = "instruction_ingredients", joinColumns = @JoinColumn(name = "instruction_id"))
    private List<IngredientEntity> ingredients;

    @ElementCollection
    @JoinTable(name = "instruction_equipment",
            joinColumns = @JoinColumn(name = "instruction_id"))
    private List<Equipment> equipment;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride( name = "number", column = @Column(name = "instruction_duration_number")),
            @AttributeOverride( name = "unit", column = @Column(name = "instruction_duration_unit"))
    })
    private InstructionDuration length;

    public InstructionEntity(int number, String step, List<IngredientEntity> ingredients,List<Equipment> equipment,InstructionDuration length) {
        this.number = number;
        this.step = step;
        this.ingredients = ingredients;
        this.equipment = equipment;
        this.length = length;
    }
}
