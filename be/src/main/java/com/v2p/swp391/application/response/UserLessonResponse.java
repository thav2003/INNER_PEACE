package com.v2p.swp391.application.response;

import com.v2p.swp391.application.dto.LessonDto;
import com.v2p.swp391.application.model.LessonEntity;
import com.v2p.swp391.application.model.UserEntity;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserLessonResponse {
    private Long id;
    private LessonDto lesson;
    private Long watchedMillis;
}
