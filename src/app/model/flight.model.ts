import { OnInit } from '@angular/core';
import { Fare } from './fare.model';
import { Deserializable } from './deserializable.model';

export class Flight implements Deserializable {
  id!: string;
  flightNumber!: string;
  origin!: string;
  destination!: string;
  flightDate!: string;
  fare!: Fare;

  deserialize(input: any) {
    Object.assign(this, input);
    this.fare = input.fare ? new Fare().deserialize(input.fare) : new Fare();
    return this;
  }
}
