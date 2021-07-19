package com.cts.controller;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import com.cts.errors.UiError;
import com.cts.vo.BookingRecord;
import com.cts.vo.CheckInRecord;
import com.cts.vo.Flight;
import com.cts.vo.SearchQuery;

@RestController
public class UiRestController {
	private static final Logger logger = LoggerFactory.getLogger(UiRestController.class);
	
	@Autowired
	private RestTemplate template;

	@Value("${ui.search-url}")
	String searchUrl;

	@Value("${ui.booking-url}")
	String bookingUrl;

	@Value("${ui.check-in-url}")
	String checkInUrl;

	@PostMapping("/search")
	public ResponseEntity<?> searchFlights(@RequestBody @Valid SearchQuery searchQuery, Errors errors) {
		if (errors.hasErrors()) {
			return ResponseEntity.badRequest()
					.build();
		}
		return template.postForEntity(searchUrl, searchQuery, Flight[].class);

	}

	@PostMapping("/booking")
	public ResponseEntity<?> booking(@RequestBody @Valid BookingRecord bookingRecord, Errors errors) {
		logger.info("Received booking {}", bookingRecord);
		if (errors.hasErrors()) {
			logger.info("Bad request for BookingRecord");
			List<String> ers = new ArrayList<>();
			errors.getFieldErrors()
					.forEach(er -> ers.add(er.getField() + ": " + er.getDefaultMessage()));
			return ResponseEntity.badRequest()
					.body(UiError.builder()
							.message("Invalid BookingRecord")
							.errors(ers)
							.build());
		}
		return template.postForEntity(bookingUrl, bookingRecord, Long.class);
	}

	@GetMapping("/booking/{id}")
	public BookingRecord getBookingRecord(@PathVariable Long id) {
		logger.info("Retrieving BookingRecord for id {}", id);
		URI getBooking = UriComponentsBuilder.fromHttpUrl(bookingUrl)
				.path("/{id}")
				.build(id);
		return template.getForObject(getBooking, BookingRecord.class);
	}

	@PostMapping("/checkin")
	public ResponseEntity<Long> checkin(@RequestBody @Valid CheckInRecord record) {
		return template.postForEntity(checkInUrl, record, Long.class);
	}

}
