package com.v2p.swp391.websocket;

import com.fasterxml.jackson.databind.JsonNode;
import com.v2p.swp391.common.socket.NotifyOnPaymentUpdate;
import com.v2p.swp391.payment.type.PaymentData;
import com.v2p.swp391.websocket.SocketIOService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import java.lang.reflect.Method;

@Component
public class PaymentUpdateInterceptor implements HandlerInterceptor {

    private final SocketIOService socketIOService;

    public PaymentUpdateInterceptor(SocketIOService socketIOService) {
        this.socketIOService = socketIOService;
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) {
        if (handler instanceof HandlerMethod) {
            HandlerMethod handlerMethod = (HandlerMethod) handler;
            Method method = handlerMethod.getMethod();

            if (method.isAnnotationPresent(NotifyOnPaymentUpdate.class)) {
                JsonNode order = (JsonNode) request.getAttribute("order");
                if (order != null) {
                    socketIOService.onPaymentUpdated(null,order);
                }
            }
        }
    }
}