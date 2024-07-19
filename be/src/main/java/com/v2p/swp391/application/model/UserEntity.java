package com.v2p.swp391.application.model;

import com.v2p.swp391.common.enums.Role;
import com.v2p.swp391.common.enums.SocialProvider;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.*;

import java.util.List;
import java.util.Set;

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

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<DailyMealPlanEntity> dailyMealPlans;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<UserLessonEntity> userLessonHistories;

    @ElementCollection
    @CollectionTable(name = "user_packages", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "package_name")
    private List<String> purchasedPackages;

    @ManyToMany(mappedBy = "users")
    private List<RoomEntity> rooms;
}
