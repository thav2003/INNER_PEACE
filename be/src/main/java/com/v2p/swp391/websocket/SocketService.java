package com.v2p.swp391.websocket;

import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.listener.DataListener;
import com.fasterxml.jackson.databind.JsonNode;
import com.v2p.swp391.application.model.LessonEntity;
import com.v2p.swp391.application.model.UserEntity;
import com.v2p.swp391.application.model.UserLessonEntity;
import com.v2p.swp391.application.repository.LessonRepository;
import com.v2p.swp391.application.repository.UserLessonHistoryRepository;
import com.v2p.swp391.application.repository.UserRepository;
import com.v2p.swp391.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@Service
@RequiredArgsConstructor
@Slf4j
public class SocketService {
    private final SocketIOServer server;
    private final ExecutorService executorService = Executors.newCachedThreadPool();
    private final Map<String, Boolean> processingMap = new ConcurrentHashMap<>();
    private final UserRepository userRepository;
    private final LessonRepository lessonRepository;
    private final UserLessonHistoryRepository userLessonHistoryRepository;

    public DataListener<JsonNode> updateVideoTime(){
        return (client, data, ack)->{
            Long lessonId = data.get("lessonId").asLong();
            Long userId = data.get("userId").asLong();
            Long currentTimeMillis = data.get("currentTimeMillis").asLong();

            System.out.println("Payment updated for video: " + lessonId);
            System.out.println("Payment updated for userId: " + userId);
            System.out.println("Payment updated for currentTimeMillis: " + currentTimeMillis);
            String key = userId + "_" + lessonId;
            if (processingMap.putIfAbsent(key, true) == null) {
                // Nếu chưa có trong map, thực hiện xử lý
                executorService.submit(() -> {
                    try {
                        // Save the current time watched
                        UserLessonEntity history = userLessonHistoryRepository.findByUserIdAndLessonId(userId, lessonId)
                                .orElseGet(() -> {
                                    UserLessonEntity newHistory = new UserLessonEntity();
                                    UserEntity user = userRepository.findById(userId)
                                            .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
                                    LessonEntity lesson = lessonRepository.findById(lessonId)
                                            .orElseThrow(() -> new ResourceNotFoundException("Lesson", "id", lessonId));
                                    newHistory.setUser(user);
                                    newHistory.setLesson(lesson);
                                    newHistory.setWatchedMillis(currentTimeMillis);
                                    return newHistory;
                                });

                        history.setWatchedMillis(currentTimeMillis);
                        userLessonHistoryRepository.save(history);
                    } finally {
                        // Sau khi xử lý xong, loại bỏ phiên làm việc ra khỏi map
                        processingMap.remove(key);
                    }
                });
            }
        };
    }

    public DataListener<JsonNode> leaveRoom() {
        return (client, room, ack) -> {
            String roomType = room.get("roomType").asText();
            if (roomType.equals("VIDEO")) {
                String lessonId = room.get("lessonId").asText();
                Long userId = room.get("userId").asLong();
                client.leaveRoom("ROOM_VIDEO_" + lessonId + "_" + userId);
                log.info("Client left video room: ROOM_VIDEO_" + lessonId + "_" + userId);
            } else if (roomType.equals("PAYMENT")) {
                String orderId = room.get("orderId").asText();
                client.leaveRoom("ROOM_PAYMENT_" + orderId);
                log.info("Client left payment room: ROOM_PAYMENT_" + orderId);
            } else if (roomType.equals("CHAT")) {
                String chatRoomId = room.get("chatRoomId").asText();
                client.leaveRoom("ROOM_CHAT_" + chatRoomId);
                log.info("Client left chat room: ROOM_CHAT_" + chatRoomId);
            } else {
                log.warn("Unknown room type: " + roomType);
            }
        };
    }

    public DataListener<JsonNode> joinRoom() {

        return (client, room, ack)->{
            String roomType = room.get("roomType").asText();
            if(roomType.equals("VIDEO")){
                String lessonId = room.get("lessonId").asText();
                Long userId = room.get("userId").asLong();
                client.joinRoom("ROOM_VIDEO_" + lessonId + "_" + userId);
                log.info("Client joined video room: ROOM_VIDEO_" + lessonId + "_" + userId);
            }else if(roomType.equals("PAYMENT")){
                String orderId = room.get("orderId").asText();
                client.joinRoom("ROOM_PAYMENT_" + orderId);
                log.info("Client joined payment room: ROOM_PAYMENT_" + orderId);
            }else if(roomType.equals("CHAT")){
                String chatRoomId = room.get("chatRoomId").asText();
                client.joinRoom("ROOM_CHAT_" + chatRoomId);
                log.info("Client joined chat room: ROOM_CHAT_" + chatRoomId);
            }else {
                log.warn("Unknown room type: " + roomType);
            }
        };
    }
}
