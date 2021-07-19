import { OnInit } from '@angular/core';
import { Passenger } from './passenger.model';
import { Deserializable } from './deserializable.model';
import { Fare } from './fare.model';

export class BookingRecord implements Deserializable {
  id!: string;
  flightNumber!: string;
  origin!: string;
  destination!: string;
  flightDate!: string;
  fare!: Fare;
  bookingDate!: string;
  passengers!: Passenger[];
  status!: string;
  amount!: string

  constructor() {
    this.passengers = [];
    this.fare = new Fare();
  }

  deserialize(input: BookingRecord) {
    Object.assign(this, input);
    this.passengers = input.passengers
      ? input.passengers.map((passenger) =>
          new Passenger().deserialize(passenger)
        )
      : [];
    this.fare = input.fare ? new Fare().deserialize(input.fare) : new Fare();
    this.amount = this.fare.amount;
    return this;
  }
}
