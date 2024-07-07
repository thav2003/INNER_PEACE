package com.v2p.swp391.application.repository;

import com.v2p.swp391.application.model.UserLessonEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserLessonHistoryRepository extends JpaRepository<UserLessonEntity,Long> {
    @EntityGraph(attributePaths = {"lesson"})
    Page<UserLessonEntity> findByUserId(Long userId, Pageable pageable);

    @EntityGraph(attributePaths = {"lesson"})
    Optional<UserLessonEntity> findByUserIdAndLessonId(Long userId, Long lessonId);

}
