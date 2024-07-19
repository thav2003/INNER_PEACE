package com.v2p.swp391.application.service;


import com.v2p.swp391.application.model.MessageEntity;
import com.v2p.swp391.application.model.RoomEntity;
import com.v2p.swp391.application.repository.MessageRepository;
import com.v2p.swp391.application.repository.RoomRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@AllArgsConstructor
public class ChatService {

    private final RoomRepository roomRepository;
    private final MessageRepository messageRepository;

    public List<MessageEntity> getMessages(Long roomId) {
        return messageRepository.findByRoomId(roomId);
    }
    public Page<RoomEntity> findRoomsByUserId(Long userId, Pageable pageable) {
        return  roomRepository.findByUsersId(userId, pageable);
    }
}
