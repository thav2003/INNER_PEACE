package com.v2p.swp391;

import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.annotation.SpringAnnotationScanner;
import jakarta.annotation.PostConstruct;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableScheduling;

import java.util.TimeZone;

@SpringBootApplication
@EnableAutoConfiguration
@EnableScheduling
public class Swp391Application {

	@Bean
	public SpringAnnotationScanner springAnnotationScanner(SocketIOServer server) {
		return new SpringAnnotationScanner(server);
	}

	public static void main(String[] args) {
		SpringApplication.run(Swp391Application.class, args);
	}
	@PostConstruct
	void init() {
		TimeZone.setDefault(TimeZone.getTimeZone("Asia/Ho_Chi_Minh"));
	}
}
