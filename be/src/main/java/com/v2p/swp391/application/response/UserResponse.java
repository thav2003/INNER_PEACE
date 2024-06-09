package com.v2p.swp391.application.response;

import com.v2p.swp391.common.enums.Role;
import com.v2p.swp391.common.enums.SocialProvider;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserResponse {
    private Long id;

    private String fullName;

    private String phoneNumber;

    private String email;

    private String imageUrl;

    private Role role;

    private Boolean isActive;

    private SocialProvider socialProvider;

    private String providerId;
}
