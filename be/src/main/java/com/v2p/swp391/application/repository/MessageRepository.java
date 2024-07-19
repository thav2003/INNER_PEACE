package com.v2p.swp391.application.repository;

import com.v2p.swp391.application.model.MessageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<MessageEntity,Long> {
    List<MessageEntity> findByRoomId(Long roomId);
}
