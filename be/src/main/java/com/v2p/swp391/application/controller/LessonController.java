package com.v2p.swp391.application.controller;

import com.v2p.swp391.application.model.LessonEntity;
import com.v2p.swp391.application.request.CreateLessonRequest;
import com.v2p.swp391.application.request.UpdateLessonRequest;
import com.v2p.swp391.application.service.LessonService;
import com.v2p.swp391.common.constant.Path;
import com.v2p.swp391.utils.Helpers;
import com.v2p.swp391.utils.UploadUtils;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.util.List;
import java.util.Optional;

@Slf4j
@AllArgsConstructor
@RestController
@RequestMapping("${app.api.version.v1}/lessons")
public class LessonController {
    private final LessonService lessonService;

    @PostMapping(consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<LessonEntity> createLesson(@ModelAttribute CreateLessonRequest request) {
        ModelMapper modelMapper = new ModelMapper();



        LessonEntity lesson = modelMapper.map(request, LessonEntity.class);
        if(request.getImgFile() != null){
            String imgPath = UploadUtils.storeImage(request.getImgFile(), Path.LESSON_IMAGE_PATH);
            lesson.setImgUrl(imgPath);
        }
        if(request.getVideoFile() != null){
            String videoPath = UploadUtils.storeVideo(request.getVideoFile(),Path.LESSON_VIDEO_PATH);
            lesson.setVideoUrl(videoPath);

            if(request.getImgFile() == null){
                String imgPath = Helpers.extractPictureFromVideo(Path.LESSON_VIDEO_PATH+ File.separator +videoPath);
                lesson.setImgUrl(imgPath);
            }
        }

        LessonEntity createdLesson = lessonService.createLesson(lesson);
        return ResponseEntity.ok(createdLesson);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LessonEntity> getLessonById(@PathVariable Long id) {
        Optional<LessonEntity> lesson = lessonService.getLessonById(id);
        return lesson.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<LessonEntity>> getAllLessons() {
        List<LessonEntity> lessons = lessonService.getAllLessons();
        return ResponseEntity.ok(lessons);
    }

    @PutMapping(value="/{id}", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<LessonEntity> updateLesson(@PathVariable Long id, @ModelAttribute UpdateLessonRequest request) {
        ModelMapper modelMapper = new ModelMapper();
        LessonEntity lessonDetails = modelMapper.map(request, LessonEntity.class);
        if(request.getImgFile() != null){
            String imgPath = UploadUtils.storeImage(request.getImgFile(), Path.LESSON_IMAGE_PATH);
            lessonDetails.setImgUrl(imgPath);
        }
        LessonEntity updatedLesson = lessonService.updateLesson(id, lessonDetails);
        return ResponseEntity.ok(updatedLesson);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLesson(@PathVariable Long id) {
        lessonService.deleteLesson(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public ResponseEntity<List<LessonEntity>> searchLessons(@RequestParam(name = "keyword",required = false) String keyword,
                                                            @RequestParam(name = "page", defaultValue = "0") int page,
                                                            @RequestParam(name = "size", defaultValue = "10") int size) {
        List<LessonEntity> lessons = lessonService.searchLessons(keyword, page, size);
        return ResponseEntity.ok(lessons);
    }
}
