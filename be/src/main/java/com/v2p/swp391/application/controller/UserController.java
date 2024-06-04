package com.v2p.swp391.application.controller;

import com.v2p.swp391.application.mapper.UserHttpMapper;
import com.v2p.swp391.application.model.UserEntity;
import com.v2p.swp391.application.request.ChangePasswordRequest;
import com.v2p.swp391.application.response.AuthResponse;
import com.v2p.swp391.application.service.AuthService;
import com.v2p.swp391.application.service.UserService;
import com.v2p.swp391.common.api.CoreApiResponse;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@AllArgsConstructor
@RestController
@RequestMapping("${app.api.version.v1}/users")
public class UserController {
    private final AuthService authService;

    private final UserService userService;
    private final UserHttpMapper userMapper;
    @GetMapping
    public ResponseEntity<List<UserEntity>> getAllUsers() {
        List<UserEntity> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserEntity> getUserById(@PathVariable Long id) {
        return userService.getUserById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<UserEntity> createUser(@RequestBody UserEntity user) {
        UserEntity createdUser = userService.createUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserEntity> updateUser(@PathVariable Long id, @RequestBody UserEntity userDto) {
        UserEntity user = userService.getUserById(id).orElse(null);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        userMapper.updateUserFromDto(userDto, user);
        UserEntity updatedUser = userService.updateUser(user);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        if (!userService.getUserById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        userService.deleteUserById(id);
        return ResponseEntity.noContent().build();
    }

//    @GetMapping("/admin")
//    @PreAuthorize("hasRole('ADMIN') or hasRole('MANAGER') or hasRole('STAFF')")
//    public String userAccess() {
//        return "User Content.";
//    }
//
//    @GetMapping("/customer")
//    @PreAuthorize("hasRole('CUSTOMER')")
//    public String customerAccess()
//    {
//
//        return "Customer Content.";
//    }


}
