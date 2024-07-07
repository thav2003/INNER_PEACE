package com.v2p.swp391.application.service;

import com.v2p.swp391.application.model.UserEntity;
import com.v2p.swp391.application.model.UserLessonEntity;
import com.v2p.swp391.application.repository.UserLessonHistoryRepository;
import com.v2p.swp391.application.repository.UserRepository;
import com.v2p.swp391.common.enums.SocialProvider;
import com.v2p.swp391.exception.ResourceNotFoundException;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final UserLessonHistoryRepository userLessonHistoryRepository;
    public List<UserEntity> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<UserEntity> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public UserEntity createUser(UserEntity user) {
        user.setIsActive(true);
        user.setSocialProvider(SocialProvider.DATABASE);
        return userRepository.save(user);
    }

    public UserEntity updateUser(Long id, UserEntity userDetails) {
        UserEntity userEntity = userRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("User","id",id));
        modelMapper.map(userDetails, userEntity);
        return userRepository.save(userEntity);
    }

    public void deleteUserById(Long id) {
        userRepository.deleteById(id);
    }

    public Page<UserLessonEntity> getWatchedLessonHistory(Long userId, Pageable pageable) {

        return userLessonHistoryRepository.findByUserId(userId, pageable);
    }
}