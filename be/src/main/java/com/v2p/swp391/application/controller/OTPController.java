package com.v2p.swp391.application.controller;

import com.v2p.swp391.application.request.ValidateOtpRequest;
import com.v2p.swp391.application.service.AuthService;
import com.v2p.swp391.common.api.CoreApiResponse;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@Slf4j
@AllArgsConstructor
@RestController
@RequestMapping("${app.api.version.v1}/otp")
public class OTPController {
    private final AuthService authService;

    @PostMapping(value = "/generate")
    public CoreApiResponse<?> generateOTP()
    {
        authService.generateOtp();
        return CoreApiResponse.success("generate successfully");

    }

    @PostMapping(value = "/validate")
    public CoreApiResponse<?> validateOTP(@RequestBody ValidateOtpRequest otp)
    {
        authService.validateOTP(otp.getOtp());
        return CoreApiResponse.success("Entered OTP is valid!");

    }
}
