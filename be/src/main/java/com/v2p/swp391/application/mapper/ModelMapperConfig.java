package com.v2p.swp391.application.mapper;

import com.v2p.swp391.application.dto.LessonDto;
import com.v2p.swp391.application.model.LessonCategoryEntity;
import com.v2p.swp391.application.model.LessonEntity;
import com.v2p.swp391.application.model.UserLessonEntity;
import com.v2p.swp391.application.response.UserLessonResponse;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Configuration
public class ModelMapperConfig {

    @Bean
    public ModelMapper modelMapper() {
        Converter<List<LessonCategoryEntity>, List<String>> convertListLessonCategoryEntityToListString =
                ctx -> ctx.getSource()
                        .stream()
                        .map(LessonCategoryEntity::getName)
                        .toList();

        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        modelMapper.getConfiguration().setPropertyCondition(context -> context.getSource() != null);
//        modelMapper.addMappings(new PropertyMap<UserLessonEntity, UserLessonResponse>() {
//            @Override
//            protected void configure() {
//                map().setLesson(modelMapper.map(source.getLesson(),LessonDto.class));
//            }
//        });
        modelMapper.createTypeMap(LessonEntity.class, LessonDto.class)
                .addMappings(map -> map
                        .using(convertListLessonCategoryEntityToListString)
                        .map(LessonEntity::getCategories,LessonDto::setCategories)
                );
        return modelMapper;
    }
}
