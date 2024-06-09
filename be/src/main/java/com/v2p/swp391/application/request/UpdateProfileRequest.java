package com.v2p.swp391.application.request;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Setter
@Getter
@Data
public class UpdateProfileRequest {
    private String fullName;
    private String phoneNumber;
    private MultipartFile imgFile;
}
