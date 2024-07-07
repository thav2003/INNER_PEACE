package com.v2p.swp391.application.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "lesson_categories")
public class LessonCategoryEntity extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "parent_id")
    private LessonCategoryEntity parent;

    @OneToMany(mappedBy = "parent")
    private Set<LessonCategoryEntity> children;

//    @ManyToMany(mappedBy = "categories")
//    private List<LessonEntity> lessons;

    public Set<LessonCategoryEntity> collectLeafChildren() {
        Set<LessonCategoryEntity> results = new HashSet<>();
        if (children.isEmpty()) {
            results.add(this);
        } else {
            children.forEach(child -> {
                results.addAll(child.collectLeafChildren());
            });
        }
        return results;
    }
}