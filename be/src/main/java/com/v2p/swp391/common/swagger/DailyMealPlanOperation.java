package com.v2p.swp391.common.swagger;

import com.v2p.swp391.application.dto.DailyMealPlanDto;
import com.v2p.swp391.application.model.LessonEntity;
import com.v2p.swp391.common.api.CoreResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

class DailyMealPlanResponse extends CoreResponse<DailyMealPlanDto> {
}

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@Operation(
        responses = {
                @ApiResponse(responseCode = "200",
                        content = @Content(mediaType = "application/json",
                                schema = @Schema(implementation = DailyMealPlanResponse.class))),

        })
public @interface DailyMealPlanOperation {
}
