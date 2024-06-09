package com.v2p.swp391.application.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.v2p.swp391.common.enums.Role;
import com.v2p.swp391.common.enums.SocialProvider;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class UserEntity extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String fullName;

    @Column(nullable = false)
    private String phoneNumber;

    @Email
    @Column(nullable = false)
    private String email;

    private String password;

    private String imageUrl;

    @Enumerated(EnumType.STRING)
    private Role role;

    private Boolean isActive;

    @Enumerated(EnumType.STRING)
    private SocialProvider socialProvider;

    private String providerId;

}
