package com.v2p.swp391.application.service;

import com.v2p.swp391.application.model.LessonEntity;
import com.v2p.swp391.application.model.UserEntity;
import com.v2p.swp391.application.repository.LessonRepository;
import com.v2p.swp391.exception.ResourceNotFoundException;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class LessonService {

    private final LessonRepository lessonRepository;

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

        ModelMapper modelMapper = getCustomModelMapper();
        modelMapper.map(lessonDetails, lesson);
        return lessonRepository.save(lesson);
    }

    public void deleteLesson(Long id) {
        lessonRepository.delete(getLessonById(id));
    }
    public Page<LessonEntity> searchLessons(String keyword, int page, int size) {
        Pageable pageable;
        Page<LessonEntity> lessonPage;
        pageable = PageRequest.of(page, size);
        if (keyword == null || keyword.isEmpty()) {

            lessonPage = lessonRepository.findAll(pageable);
        } else {
            lessonPage = lessonRepository.findByNameContainingIgnoreCase(keyword, pageable);
        }

        return lessonPage;    }

    private ModelMapper getCustomModelMapper() {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        modelMapper.getConfiguration().setPropertyCondition(context -> context.getSource() != null);
        return modelMapper;
    }
}