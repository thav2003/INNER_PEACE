package com.v2p.swp391.application.service;

import com.v2p.swp391.application.dto.LessonDto;
import com.v2p.swp391.application.model.LessonCategoryEntity;
import com.v2p.swp391.application.model.LessonEntity;
import com.v2p.swp391.application.model.UserEntity;
import com.v2p.swp391.application.model.UserLessonEntity;
import com.v2p.swp391.application.repository.LessonRepository;
import com.v2p.swp391.application.repository.UserLessonHistoryRepository;
import com.v2p.swp391.application.repository.UserRepository;
import com.v2p.swp391.exception.ResourceNotFoundException;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class LessonService {

    private final UserRepository userRepository;
    private UserLessonHistoryRepository userLessonHistoryRepository;
    private final LessonRepository lessonRepository;
    private final ModelMapper modelMapper;

    public LessonEntity createLesson(LessonEntity lesson) {
        return lessonRepository.save(lesson);
    }

    public LessonEntity getLessonById(Long id) {
        return lessonRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Lesson", "id", id));
    }

    public List<LessonEntity> getAllLessons() {
        return lessonRepository.findAll();
    }

    public LessonEntity updateLesson(Long id, LessonEntity lessonDetails) {
        LessonEntity lesson = lessonRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Lesson","id",id));

        modelMapper.map(lessonDetails, lesson);
        return lessonRepository.save(lesson);
    }

    public void deleteLesson(Long id) {
        lessonRepository.delete(getLessonById(id));
    }
    public Page<LessonDto> searchLessons(String keyword, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<LessonEntity> lessonPage;

        if (keyword == null || keyword.isEmpty()) {
            lessonPage = lessonRepository.findAll(pageable);
        } else {
            lessonPage = lessonRepository.findByNameContainingIgnoreCase(keyword, pageable);
        }

        return lessonPage.map(lessonEntity->{
            LessonDto dto = modelMapper.map(lessonEntity, LessonDto.class);
//             dto.setCategories(lessonEntity.getCategories().stream()
//                            .map(LessonCategoryEntity::getName)
//                            .collect(Collectors.toList()));
             return dto;
        });
    }

    private LessonDto convertToDto(LessonEntity lessonEntity) {
        return modelMapper.map(lessonEntity, LessonDto.class);
    }

    public void markLessonAsWatched(Long userId, Long lessonId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        LessonEntity lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new ResourceNotFoundException("Lesson", "id", lessonId));

        boolean alreadyWatched = user.getUserLessonHistories().stream()
                .anyMatch(history -> history.getLesson().getId().equals(lessonId));

        if (!alreadyWatched) {

            UserLessonEntity history = new UserLessonEntity();
            history.setUser(user);
            history.setLesson(lesson);
            history.setWatchedMillis(0L);
            userLessonHistoryRepository.save(history);
        }
    }
}