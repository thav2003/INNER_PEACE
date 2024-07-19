package com.v2p.swp391.application.dto;

import com.v2p.swp391.application.model.RoomEntity;
import com.v2p.swp391.application.model.UserEntity;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MessageDto {
    private Long id;
    private Long senderId;
    private String senderName;
    private Long receiverId;
    private String receiverName;
    private String content;
}
