package com.v2p.swp391.application.mapper;

import com.v2p.swp391.application.dto.LessonDto;
import com.v2p.swp391.application.dto.MessageDto;
import com.v2p.swp391.application.dto.RoomDto;
import com.v2p.swp391.application.model.*;
import com.v2p.swp391.application.response.UserLessonResponse;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.modelmapper.convention.MatchingStrategies;
import org.modelmapper.spi.MappingContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Set;
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
        Converter<List<UserEntity>, List<RoomDto.UserDto>> userConverter =
                ctx -> ctx.getSource()
                        .stream()

                        .map(src->  RoomDto.UserDto.builder()
                                .id(src.getId())
                                .name(src.getFullName())
                                .role(src.getRole())
                                .build()
                        )
                        .toList();



        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        modelMapper.getConfiguration().setPropertyCondition(context -> context.getSource() != null);

        modelMapper.createTypeMap(MessageEntity.class, MessageDto.class)
                .addMappings(mapper  ->
                        {
                            mapper.map(source -> source.getSender().getId(), MessageDto::setSenderId);
                            mapper.map(source -> source.getSender().getFullName(), MessageDto::setSenderName);
                            mapper.map(source -> source.getReceiver().getId(), MessageDto::setReceiverId);
                            mapper .map(source -> source.getReceiver().getFullName(), MessageDto::setReceiverName);
                        }
                );
        modelMapper.createTypeMap(RoomEntity.class, RoomDto.class)
                .addMappings(map -> map
                        .using(userConverter)
                        .map(RoomEntity::getUsers,RoomDto::setUsers)
                );


        modelMapper.createTypeMap(UserEntity.class, RoomDto.UserDto.class)
                .addMappings(mapper -> mapper.map(UserEntity::getId, RoomDto.UserDto::setId))
                .addMappings(mapper -> mapper.map(UserEntity::getFullName, RoomDto.UserDto::setName))
                .addMappings(mapper -> mapper.map(UserEntity::getRole, RoomDto.UserDto::setRole));

        modelMapper.createTypeMap(LessonEntity.class, LessonDto.class)
                .addMappings(map -> map
                        .using(convertListLessonCategoryEntityToListString)
                        .map(LessonEntity::getCategories,LessonDto::setCategories)
                );
        return modelMapper;
    }
}
