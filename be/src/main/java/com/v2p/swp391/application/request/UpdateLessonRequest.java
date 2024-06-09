package com.v2p.swp391.application.request;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Setter
@Getter
@Data
public class UpdateLessonRequest {
    private String name;
    private Integer duration;
    private String description;
    private Boolean isVip;
    private MultipartFile imgFile;
}
