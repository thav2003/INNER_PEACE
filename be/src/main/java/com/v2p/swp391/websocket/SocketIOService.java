package com.v2p.swp391.websocket;

import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.annotation.OnConnect;
import com.corundumstudio.socketio.annotation.OnDisconnect;
import com.corundumstudio.socketio.annotation.OnEvent;
import com.fasterxml.jackson.databind.JsonNode;
import com.v2p.swp391.application.model.LessonEntity;
import com.v2p.swp391.application.model.UserEntity;
import com.v2p.swp391.application.model.UserLessonEntity;
import com.v2p.swp391.application.repository.LessonRepository;
import com.v2p.swp391.application.repository.UserLessonHistoryRepository;
import com.v2p.swp391.application.repository.UserRepository;
import com.v2p.swp391.exception.ResourceNotFoundException;
import com.v2p.swp391.payment.type.PaymentData;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@Component
@RequiredArgsConstructor
public class SocketIOService {
    private final SocketIOServer server;
    private final UserRepository userRepository;
    private final LessonRepository lessonRepository;
    private final UserLessonHistoryRepository userLessonHistoryRepository;
    private final ExecutorService executorService = Executors.newFixedThreadPool(10);
    private final Map<String, Boolean> processingMap = new ConcurrentHashMap<>();

    @OnConnect
    public void onConnect(SocketIOClient client) {
        System.out.println("Client connected: " + client.getSessionId());
    }

    @OnDisconnect
    public void onDisconnect(SocketIOClient client) {
        System.out.println("Client disconnected: " + client.getSessionId());
    }

    @OnEvent("joinOrderRoom")
    public void onJoinOrderRoom(SocketIOClient client, String orderCode) {
        client.joinRoom(orderCode);
        System.out.println("Client joined order room: " + orderCode);
    }
    @OnEvent("joinVideoRoom")
    public void onJoinVideoRoom(SocketIOClient client, JsonNode data) {
        String lessonId = data.get("lessonId").asText();
        Long userId = data.get("userId").asLong();
        client.joinRoom("ROOM_"+lessonId+"_"+userId);
        System.out.println("Client joined video room: " + "ROOM_"+lessonId+"_"+userId);
    }

    @OnEvent("leaveVideoRoom")
    public void onLeaveVideoRoom(SocketIOClient client,  JsonNode data) {
        String lessonId = data.get("lessonId").asText();
        Long userId = data.get("userId").asLong();
        client.leaveRoom("ROOM_"+lessonId+"_"+userId);
        client.disconnect();
        System.out.println("Client left video room: " + "ROOM_"+lessonId+"_"+userId);
    }

    @OnEvent("leaveOrderRoom")
    public void onLeaveOrderRoom(SocketIOClient client, String orderCode) {
        client.leaveRoom(orderCode);
        client.disconnect();
        System.out.println("Client left order room: " + orderCode);
    }

    @OnEvent("paymentUpdated")
    public void onPaymentUpdated(SocketIOClient client,JsonNode data) {
        server.getRoomOperations(data.get("orderCode").asText()).sendEvent("paymentUpdated", data);
        System.out.println("Payment updated for order: " + data.get("orderCode"));
    }

    public void onUpdateVideoTime(SocketIOClient client, JsonNode data) {
        Long lessonId = data.get("lessonId").asLong();
        Long userId = data.get("userId").asLong();
        Long currentTimeMillis = data.get("currentTimeMillis").asLong();

        System.out.println("Payment updated for video: " + lessonId);
        System.out.println("Payment updated for userId: " + userId);
        System.out.println("Payment updated for currentTimeMillis: " + currentTimeMillis);
        String key = userId + "_" + lessonId;

        // Kiểm tra xem phiên làm việc này đã được xử lý chưa
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
    }
}