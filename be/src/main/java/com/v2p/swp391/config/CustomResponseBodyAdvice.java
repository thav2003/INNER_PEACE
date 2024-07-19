package com.v2p.swp391.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.v2p.swp391.payment.PaymentController;
import com.v2p.swp391.websocket.NotifyOnPaymentUpdate;
import org.springframework.core.MethodParameter;
import org.springframework.http.MediaType;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyAdvice;
import java.lang.reflect.Method;

@ControllerAdvice
public class CustomResponseBodyAdvice implements ResponseBodyAdvice<Object> {

    @Override
    public boolean supports(MethodParameter returnType, Class converterType) {
        // Chỉ can thiệp vào phương thức cancelOrder trong controller cụ thể
        return returnType.hasMethodAnnotation(NotifyOnPaymentUpdate.class);
    }

    @Override
    public Object beforeBodyWrite(Object body, MethodParameter returnType, MediaType selectedContentType,
                                  Class selectedConverterType, ServerHttpRequest request, ServerHttpResponse response) {
        if (body instanceof ObjectNode) {
            ObjectNode responseObject = (ObjectNode) body;
            // Thực hiện xử lý với responseObject ở đây
            processResponse(responseObject);
        }
        return body;
    }

    private void processResponse(ObjectNode responseObject) {
        // Logic xử lý response
        // Ví dụ: gửi thông báo tới hệ thống khác, log thông tin, v.v.
        String orderCode = responseObject.get("data").get("orderCode").asText();
    }
}