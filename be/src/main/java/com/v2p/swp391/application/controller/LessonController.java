package com.v2p.swp391.application.controller;

import com.v2p.swp391.application.model.LessonEntity;
import com.v2p.swp391.application.request.CreateLessonRequest;
import com.v2p.swp391.application.request.UpdateLessonRequest;
import com.v2p.swp391.application.service.LessonService;
import com.v2p.swp391.common.api.CoreApiResponse;
import com.v2p.swp391.common.api.PagedResponse;
import com.v2p.swp391.common.constant.Path;
import com.v2p.swp391.common.swagger.LessonOperation;
import com.v2p.swp391.common.swagger.SearchLessonsOperation;
import com.v2p.swp391.common.swagger.StringOperation;
import com.v2p.swp391.utils.Helpers;
import com.v2p.swp391.utils.UploadUtils;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;


@Slf4j
@AllArgsConstructor
@RestController
@RequestMapping("${app.api.version.v1}/lessons")
public class LessonController {
    private final LessonService lessonService;

    @PostMapping(consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    @LessonOperation
    public CoreApiResponse<LessonEntity> createLesson(@ModelAttribute CreateLessonRequest request) {
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
        return CoreApiResponse.success(createdLesson);
    }

    @GetMapping("/{id}")
    @LessonOperation
    public CoreApiResponse<LessonEntity> getLessonById(@PathVariable Long id) {
        LessonEntity lesson = lessonService.getLessonById(id);
        return CoreApiResponse.success(lesson);
    }

    @PutMapping(value="/{id}", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    @LessonOperation
    public CoreApiResponse<LessonEntity> updateLesson(@PathVariable Long id, @ModelAttribute UpdateLessonRequest request) {
        ModelMapper modelMapper = new ModelMapper();
        LessonEntity lessonDetails = modelMapper.map(request, LessonEntity.class);
        if(request.getImgFile() != null){
            String imgPath = UploadUtils.storeImage(request.getImgFile(), Path.LESSON_IMAGE_PATH);
            lessonDetails.setImgUrl(imgPath);
        }
        LessonEntity updatedLesson = lessonService.updateLesson(id, lessonDetails);
        return CoreApiResponse.success(updatedLesson);
    }

    @DeleteMapping("/{id}")
    @StringOperation
    public CoreApiResponse<String> deleteLesson(@PathVariable Long id) {
        lessonService.deleteLesson(id);
        return CoreApiResponse.success("Xóa thành công");
    }

    @GetMapping("/search")
    @SearchLessonsOperation
    public CoreApiResponse<PagedResponse<LessonEntity>> searchLessons(
            @RequestParam(name = "keyword",required = false) String keyword,
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "10") int size
    ) {
        Page<LessonEntity> lessons = lessonService.searchLessons(keyword, page, size);
        return CoreApiResponse.success(new PagedResponse<>(lessons));
    }
}
