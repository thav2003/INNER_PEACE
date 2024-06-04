package com.v2p.swp391.application.model.embeded;

import jakarta.persistence.*;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class Equipment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String localizedName;

    private String image;

    public Equipment(String name, String localizedName, String image) {
        this.name = name;
        this.localizedName = localizedName;
        this.image = image;
    }
}
