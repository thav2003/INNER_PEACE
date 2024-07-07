package com.v2p.swp391.application.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

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
    private String imgUrl;
    private String videoUrl;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "lesson_category",
            joinColumns = @JoinColumn(name = "lesson_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id")
    )
    private List<LessonCategoryEntity> categories = new ArrayList<>();
}
