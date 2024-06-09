package com.v2p.swp391.application.controller;

import com.v2p.swp391.application.model.UserEntity;
import com.v2p.swp391.application.request.CreateUserRequest;
import com.v2p.swp391.application.request.UpdateUserRequest;
import com.v2p.swp391.application.response.UserResponse;
import com.v2p.swp391.application.service.AuthService;
import com.v2p.swp391.application.service.UserService;
import com.v2p.swp391.common.enums.SocialProvider;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@AllArgsConstructor
@RestController
@RequestMapping("${app.api.version.v1}/users")
public class UserController {
    private final AuthService authService;

    private final UserService userService;

    @GetMapping
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        List<UserEntity> users = userService.getAllUsers();
        ModelMapper modelMapper = new ModelMapper();
        List<UserResponse> userResponses = users.stream()
                .map(user -> modelMapper.map(user, UserResponse.class))
                .collect(Collectors.toList());
        return ResponseEntity.ok(userResponses);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getUserById(@PathVariable Long id) {
        ModelMapper modelMapper = new ModelMapper();
        return userService.getUserById(id)
                .map(user -> modelMapper.map(user, UserResponse.class))
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<UserResponse> createUser(@RequestBody CreateUserRequest request) {
        ModelMapper modelMapper = new ModelMapper();
        UserEntity createdUser = userService.createUser(modelMapper.map(request,UserEntity.class));
        UserResponse userResponse = modelMapper.map(createdUser, UserResponse.class);
        return ResponseEntity.status(HttpStatus.CREATED).body(userResponse);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserResponse> updateUser(@PathVariable Long id, @RequestBody UpdateUserRequest request) {
        ModelMapper modelMapper = new ModelMapper();
        UserEntity updatedUser = userService.updateUser(id, modelMapper.map(request,UserEntity.class));
        if (updatedUser != null) {
            UserResponse userResponse = modelMapper.map(updatedUser, UserResponse.class);
            return ResponseEntity.ok(userResponse);
        }
        return ResponseEntity.notFound().build();
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
