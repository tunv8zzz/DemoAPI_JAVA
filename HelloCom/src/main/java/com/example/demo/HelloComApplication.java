package com.example.demo;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class HelloComApplication {
	private static final Logger log = LoggerFactory.getLogger(HelloComApplication.class);
	
	public static void main(String[] args) {
		log.info("kkkkkkk");
		SpringApplication.run(HelloComApplication.class, args);
	}

}
