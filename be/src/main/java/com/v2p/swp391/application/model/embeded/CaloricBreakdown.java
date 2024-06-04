package com.v2p.swp391.application.model.embeded;

import jakarta.persistence.Embeddable;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class CaloricBreakdown {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double percentProtein;

    private Double percentFat;

    private Double percentCarbs;

    public CaloricBreakdown(Double percentProtein, Double percentFat, Double percentCarbs) {
        this.percentProtein = percentProtein;
        this.percentFat = percentFat;
        this.percentCarbs = percentCarbs;
    }
}
