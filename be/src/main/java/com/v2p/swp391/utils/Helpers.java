package com.v2p.swp391.utils;

import com.v2p.swp391.application.model.UserEntity;
import com.v2p.swp391.common.constant.Path;
import com.v2p.swp391.exception.AppException;
import com.v2p.swp391.security.UserPrincipal;
import org.jcodec.api.FrameGrab;
import org.jcodec.common.io.FileChannelWrapper;
import org.jcodec.common.io.NIOUtils;
import org.jcodec.common.model.Picture;
import  org.jcodec.scale.AWTUtil;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.nio.file.Files;
import java.nio.file.Paths;

public class Helpers {
    public static UserEntity getUserFromAuth(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        UserEntity user = userPrincipal.getUserEntity();
        return user;
    }

    public static String extractPictureFromVideo(String path){
        try {
            File videoFile = new File(path);
            FileChannelWrapper in = NIOUtils.readableFileChannel(path);
            FrameGrab grab = FrameGrab.createFrameGrab(in);
            Picture picture = grab.getNativeFrame();

            BufferedImage bufferedImage = AWTUtil.toBufferedImage(picture);

            java.nio.file.Path uploadDir = Paths.get(Path.LESSON_IMAGE_PATH);
            if (!Files.exists(uploadDir)) {
                Files.createDirectories(uploadDir);
            }
            String imgPath = Path.LESSON_IMAGE_PATH + File.separator + "thumbnail_"+ System.currentTimeMillis() + "_" + videoFile.getName() + ".png";
            ImageIO.write(bufferedImage, "png", new File(imgPath));
            return "thumbnail_" + videoFile.getName() + ".png";
        }catch (Exception ex) {
            throw new AppException(HttpStatus.BAD_REQUEST, "Trích xuất ảnh từ video bị lỗi");
        }

    }
}
