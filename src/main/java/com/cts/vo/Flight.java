package com.cts.vo;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class Flight {

	private Long id;

	private String flightNumber;

	private String origin;

	private String destination;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
	private LocalDate flightDate;

	@EqualsAndHashCode.Exclude
	@ToString.Exclude
	private Fare fare;

	@EqualsAndHashCode.Exclude
	@ToString.Exclude
	private Inventory inventory;
}
