package com.v2p.swp391.application.mapper;

import com.v2p.swp391.application.model.UserEntity;
import org.mapstruct.*;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE,
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface UserHttpMapper {
    void updateUserFromDto(UserEntity dto, @MappingTarget UserEntity entity);
}
