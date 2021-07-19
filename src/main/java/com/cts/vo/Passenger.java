package com.cts.vo;

import javax.validation.constraints.NotNull;

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
public class Passenger {

	private Long id;

	@NotNull
	private final String firstName;

	@NotNull
	private final String lastName;

	@NotNull
	private final String gender;

}
