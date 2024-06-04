package com.v2p.swp391.application.model.embeded;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class WeightPerServing {

    private Double amount;

    private String unit;

}
