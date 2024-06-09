package com.v2p.swp391.application.repository;

import com.v2p.swp391.application.model.LessonEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LessonRepository extends JpaRepository<LessonEntity,Long> {
    Page<LessonEntity> findByNameContainingIgnoreCase(String keyword, Pageable pageable);
}
