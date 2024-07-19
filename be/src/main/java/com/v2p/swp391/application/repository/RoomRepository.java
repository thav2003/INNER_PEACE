package com.v2p.swp391.application.repository;

import com.v2p.swp391.application.model.RoomEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomRepository extends JpaRepository<RoomEntity,Long> {
    Page<RoomEntity> findByUsersId(Long userId, Pageable pageable);
}
