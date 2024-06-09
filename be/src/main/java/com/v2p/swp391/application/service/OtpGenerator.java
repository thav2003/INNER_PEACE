package com.v2p.swp391.application.service;

import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;
import org.springframework.stereotype.Service;

import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Random;
import java.util.concurrent.TimeUnit;

@Service
public class OtpGenerator {

    private static final Integer EXPIRE_MIN = 10;
    private static final Integer OTP_LENGTH = 4;
    private LoadingCache<String, String> otpCache;

    /**
     * Constructor configuration.
     */
    public OtpGenerator()
    {
        super();
        otpCache = CacheBuilder.newBuilder()
                .expireAfterWrite(EXPIRE_MIN, TimeUnit.MINUTES)
                .build(new CacheLoader<String, String>() { // Sửa Integer thành String
                    @Override
                    public String load(String s) throws Exception {
                        return ""; // Thay 0 bằng chuỗi rỗng
                    }
                });
    }

    /**
     * Method for generating OTP and put it in cache.
     *
     * @param key - cache key
     * @return cache value (generated OTP number)
     */
    public String generateOTP(String key)
    {
        StringBuilder generatedOTP = new StringBuilder();
        SecureRandom secureRandom = new SecureRandom();
        try {

            secureRandom = SecureRandom.getInstance(secureRandom.getAlgorithm());

            for (int i = 1; i <= OTP_LENGTH; i++) {
                generatedOTP.append(secureRandom.nextInt(10));
            }
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }

        String OTP = generatedOTP.toString();
        otpCache.put(key, OTP);

        return OTP;
    }

    /**
     * Method for getting OTP value by key.
     *
     * @param key - target key
     * @return OTP value
     */
    public String getOPTByKey(String key)
    {
        return otpCache.getIfPresent(key);
    }

    /**
     * Method for removing key from cache.
     *
     * @param key - target key
     */
    public void clearOTPFromCache(String key) {
        otpCache.invalidate(key);
    }
}