package com.v2p.swp391.websocket;

import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.listener.ConnectListener;
import com.corundumstudio.socketio.listener.DataListener;
import com.corundumstudio.socketio.listener.DisconnectListener;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class SocketModule {
    private final SocketIOServer server;
    private final SocketService socketService;

    public SocketModule(SocketIOServer server, SocketService socketService) {
        this.server = server;
        this.socketService = socketService;
        server.addConnectListener(onConnected());
        server.addDisconnectListener(onDisconnected());

        server.addEventListener("joinRoom", JsonNode.class, socketService.joinRoom());
        server.addEventListener("leaveRoom", JsonNode.class, socketService.leaveRoom());
//        server.addEventListener("joinVideoRoom", Message.class, onChatReceived());
//        server.addEventListener("leaveVideoRoom", Message.class, onChatReceived());
//        server.addEventListener("leaveOrderRoom", Message.class, onChatReceived());
//        server.addEventListener("paymentUpdated", Message.class, onChatReceived());
        server.addEventListener("updateVideoTime", JsonNode.class, socketService.updateVideoTime());
    }

    private ConnectListener onConnected() {
        return (client) -> {
            client.sendEvent("channel1", "Hello from channel 1");
            client.sendEvent("channel2", "Hello from channel 2");
            log.info("Client connected: " + client.getSessionId());
        };

    }

    private DisconnectListener onDisconnected() {
        return client -> {
            log.info("Client disconnected: " + client.getSessionId());
        };
    }
}
