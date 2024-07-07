package com.v2p.swp391.application.dto;

import com.v2p.swp391.application.model.LessonCategoryEntity;
import jakarta.persistence.Column;
import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LessonDto {
    private Long id;
    private String name;
    private Integer duration;
    private String description;
    private String imgUrl;
    private String videoUrl;
    private List<String> categories;
}
