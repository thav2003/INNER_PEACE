package com.v2p.swp391.application.model.embeded;

import jakarta.persistence.*;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class Equipment {

    private String name;

    private String localizedName;

    private String image;

}
