package com.v2p.swp391.application.service;

import com.v2p.swp391.application.event.MailEvent;
import com.v2p.swp391.application.request.ChangePasswordRequest;
import com.v2p.swp391.common.constant.Path;
import com.v2p.swp391.common.enums.Role;
import com.v2p.swp391.common.enums.SocialProvider;
import com.v2p.swp391.exception.AppException;
import com.v2p.swp391.application.model.UserEntity;
import com.v2p.swp391.application.repository.UserRepository;
import com.v2p.swp391.application.request.LoginRequest;
import com.v2p.swp391.application.request.SignUpRequest;
import com.v2p.swp391.application.response.AuthResponse;
import com.v2p.swp391.exception.ResourceNotFoundException;
import com.v2p.swp391.notification.ThymeleafService;
import com.v2p.swp391.notification.impl.MailServiceImpl;
import com.v2p.swp391.security.TokenProvider;
import com.v2p.swp391.security.UserPrincipal;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@AllArgsConstructor
public class AuthService {

    @Autowired
    ApplicationEventPublisher applicationEventPublisher;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private TokenProvider tokenProvider;

    @Autowired
    private MailServiceImpl mailService;

    @Autowired
    private OtpGenerator otpGenerator;

    @Autowired
    ThymeleafService thymeleafService;

    public AuthResponse signIn(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

        if(!userPrincipal.getUserEntity().getIsActive()){
            throw new AppException(HttpStatus.BAD_REQUEST,"User not active");
        }

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String accessToken = tokenProvider.createAccessToken(authentication);
//        String refreshToken = tokenProvider.createRefreshToken(authentication);

        return AuthResponse.builder()
                .accessToken(accessToken)
//                .refreshToken(refreshToken)
                .role(userPrincipal.getAuthorities().iterator().next().getAuthority())
                .userId(userPrincipal.getId())
                .imageUrl(userPrincipal.getUserEntity().getImageUrl())
                .build();
    }

    public void signUp(SignUpRequest request) {
        Optional<UserEntity> userOptional = userRepository.findByEmail(request.getEmail());
        if(userOptional.isPresent()) {
            throw new AppException(HttpStatus.BAD_REQUEST,"Email address already in use.");
        }else{

        }


        // Creating user's account
        UserEntity userEntity = new UserEntity();
        userEntity.setFullName(request.getFullName());
        userEntity.setEmail(request.getEmail());
        userEntity.setPassword(passwordEncoder.encode(request.getPassword()));
        userEntity.setImageUrl(Path.DEFAULT_AVATAR);
        userEntity.setRole(Role.CUSTOMER);
        userEntity.setPhoneNumber(request.getPhone());
        userEntity.setIsActive(true);
        userEntity.setSocialProvider(SocialProvider.DATABASE);
        userEntity.setPurchasedPackages(List.of("Basic"));
        userRepository.save(userEntity);
    }

    public void generateOtp()
    {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

        if(!userPrincipal.getUserEntity().getIsActive()){
            throw new AppException(HttpStatus.UNAUTHORIZED,"User not login");
        }


        // generate otp
        String otpValue = otpGenerator.generateOTP(userPrincipal.getEmail());

        log.info("Generated OTP: {}", otpValue);

        // fetch user e-mail from database
        UserEntity userEntity = userRepository.findByEmail(userPrincipal.getEmail())
                .orElseThrow(() ->new ResourceNotFoundException( "User", "email", userPrincipal.getEmail()));

        List<String> recipients = new ArrayList<>();
        recipients.add(userEntity.getEmail());

        // generate emailDTO object
        MailEvent mailEvent = new MailEvent(this);
        mailEvent.setSubject("Spring Boot OTP Password.");
        mailEvent.setBody(thymeleafService.getOTPContent(userEntity,otpValue));
//        mailEvent.setBody("OTP Password: " + otpValue);
        mailEvent.setRecipients(recipients);

        applicationEventPublisher.publishEvent(mailEvent);
    }

    public void validateOTP(String key,String otpNumber)
    {

        String cacheOTP = otpGenerator.getOPTByKey(key);

        log.info("OTP: {}", cacheOTP);

        if (cacheOTP==null || !cacheOTP.equals(otpNumber))
        {
            throw new AppException(HttpStatus.BAD_REQUEST,"OTP is not valid!");
        }

//        otpGenerator.clearOTPFromCache(userPrincipal.getEmail());
    }



    public void changePassword(ChangePasswordRequest request)
    {


        String cacheOTP = otpGenerator.getOPTByKey(request.getEmail());

        log.info("OTP: {}", cacheOTP);

        if (cacheOTP==null || !cacheOTP.equals(request.getOtp()))
        {
            throw new AppException(HttpStatus.BAD_REQUEST,"OTP is not valid!");
        }
        UserEntity userEntity = userRepository
                .findByEmail(request.getEmail())
                .orElseThrow(()
                        -> new ResourceNotFoundException("User", "email", request.getEmail()));

        userEntity.setPassword(passwordEncoder.encode(request.getPassword()));
        userRepository.save(userEntity);
        otpGenerator.clearOTPFromCache(request.getEmail());
    }

    public void sendOTP(String email){
        UserEntity user = userRepository
                .findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "Email", email));


        String otpValue = otpGenerator.generateOTP(email);

        log.info("Generated OTP: {}", otpValue);

        List<String> recipients = new ArrayList<>();
        recipients.add(user.getEmail());

        // generate emailDTO object
        MailEvent mailEvent = new MailEvent(this);
        mailEvent.setSubject("Spring Boot Forget Password.");
        mailEvent.setBody(thymeleafService.getOTPContent(user,otpValue));
//        mailEvent.setBody("OTP Password: " + otpValue);
        mailEvent.setRecipients(recipients);

        applicationEventPublisher.publishEvent(mailEvent);
    }

}
