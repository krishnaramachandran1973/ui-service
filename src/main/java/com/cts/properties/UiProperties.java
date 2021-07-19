package com.cts.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ConfigurationProperties(prefix = "ui")
public class UiProperties {

	private String searchUrl;
	private String bookingUrl;
	private String checkInUrl;

}
