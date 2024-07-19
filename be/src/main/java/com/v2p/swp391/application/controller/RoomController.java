package com.v2p.swp391.application.controller;

import com.v2p.swp391.application.dto.MessageDto;
import com.v2p.swp391.application.dto.RoomDto;
import com.v2p.swp391.application.model.MessageEntity;
import com.v2p.swp391.application.model.RoomEntity;
import com.v2p.swp391.application.service.ChatService;
import com.v2p.swp391.common.api.PagedResponse;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@AllArgsConstructor
@RestController
@RequestMapping("${app.api.version.v1}/rooms")
public class RoomController {

    private ChatService chatService;
    private ModelMapper mapper;

    @GetMapping("/{id}")
    public ResponseEntity<List<MessageDto>> getMessages(@PathVariable Long id) {
        return ResponseEntity.ok(chatService.getMessages(id)
                .stream()
                .map(e->mapper.map(e,MessageDto.class))
                .collect(Collectors.toList())
        );
    }
    @GetMapping
    public ResponseEntity<PagedResponse<RoomDto>> getRoomsByUserId(
            @RequestParam(name = "userId") Long userId,
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "10") int size) {

        Pageable pageable = PageRequest.of(page, size, Sort.by("updatedAt").descending());
        Page<RoomEntity> roomPage = chatService.findRoomsByUserId(userId, pageable);
        return ResponseEntity.ok(new PagedResponse(roomPage.map(e->mapper.map(e,RoomDto.class))));
    }
}
