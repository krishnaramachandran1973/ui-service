package com.cts.vo;

import java.time.LocalDate;
import java.time.LocalDateTime;

import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@NoArgsConstructor(force = true)
@RequiredArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class CheckInRecord {

	@NotNull
	private final String lastName;

	@NotNull
	private final String firstName;

	@NotNull
	private final String seatNumber;

	@NotNull
	private LocalDateTime checkInTime;

	@NotNull
	private final String flightNumber;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
	private final LocalDate flightDate;

	@NotNull
	private final Long bookingId;

}
