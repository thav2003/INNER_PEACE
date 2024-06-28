package com.v2p.swp391.common.swagger;

import com.v2p.swp391.application.model.LessonEntity;
import com.v2p.swp391.common.api.CoreResponse;
import com.v2p.swp391.common.api.PagedResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

class LessonPagedResponse extends CoreResponse<PagedResponse<LessonEntity>> {

}


@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@Operation(
        responses = {
                @ApiResponse(responseCode = "200",
                        content = @Content(mediaType = "application/json",
                                schema = @Schema(implementation = LessonPagedResponse.class))),
                @ApiResponse(responseCode = "500",
                        content = @Content(mediaType = "application/json",
                                schema = @Schema(implementation = StringResponse.class))),
        })
public @interface SearchLessonsOperation {
}
