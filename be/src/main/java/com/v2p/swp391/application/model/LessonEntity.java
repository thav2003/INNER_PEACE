package com.v2p.swp391.application.model;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "lessons")
public class LessonEntity extends  BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private Integer duration;
    @Column(columnDefinition = "TEXT")
    private String description;
    private Boolean isVip;
    private String imgUrl;
    private String videoUrl;
}
