package com.v2p.swp391.application.request;

import com.v2p.swp391.common.enums.Role;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Data
public class CreateUserRequest {
    private String fullName;
    private String phoneNumber;
    private String email;
    private String password;
    private Role role;
}
