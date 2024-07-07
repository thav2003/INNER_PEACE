package com.v2p.swp391.application.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class LoginRequest implements Serializable {
    @Schema(example = "admin@example.com")
    @NotBlank
    @Email
    private String email;

    @Schema(example = "123456")
    @NotBlank
    private String password;
}
