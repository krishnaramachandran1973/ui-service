package com.cts.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class UiConfigurer {
	
	@Bean
	RestTemplate template() {
		return new RestTemplate();
	}

}
