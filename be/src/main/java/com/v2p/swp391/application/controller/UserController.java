package com.v2p.swp391.application.controller;

import com.v2p.swp391.application.request.ChangePasswordRequest;
import com.v2p.swp391.application.response.AuthResponse;
import com.v2p.swp391.application.service.AuthService;
import com.v2p.swp391.common.api.CoreApiResponse;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@Slf4j
@AllArgsConstructor
@RestController
@RequestMapping("${app.api.version.v1}/users")
public class UserController {
    private final AuthService authService;

    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN') or hasRole('MANAGER') or hasRole('STAFF')")
    public String userAccess() {
        return "User Content.";
    }

    @GetMapping("/customer")
    @PreAuthorize("hasRole('CUSTOMER')")
    public String customerAccess()
    {

        return "Customer Content.";
    }


}
