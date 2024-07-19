package com.v2p.swp391.application.dto;

import com.v2p.swp391.common.enums.Role;
import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RoomDto {
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class UserDto {
        private Long id;
        private String name;
        private Role role;
    }
    private Long id;
    private List<UserDto> users;
}
