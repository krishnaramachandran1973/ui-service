package com.cts.vo;

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
public class Fare {

	private Long id;

	private final String amount;

	private final String currency;
}
