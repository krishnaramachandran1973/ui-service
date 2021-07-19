import { Passenger } from './../model/passenger.model';
import { BookingRecord } from './../model/bookingrecord.model';
import { Flight } from './../model/flight.model';
import { SearchQuery } from './../model/searchquery.model';
import { AppService } from './../service/app.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  searchquery: SearchQuery;
  flights: Flight[];
  bookingRecord: BookingRecord;
  showFlightList: boolean = false;
  showPassengerForm: boolean = false;
  showPassengerDetails: boolean = false;
  passengers: Passenger[];
  passengerForm: FormGroup;
  data!: Object;
  bookingConfirmed: boolean = false;

  constructor(private fb: FormBuilder, private appService: AppService) {
    this.passengerForm = fb.group({
      firstName: new FormControl(),
      lastName: new FormControl(),
      gender: new FormControl(),
    });

    this.searchquery = { origin: '', destination: '', flightDate: '' };
    this.flights = [];
    this.passengers = [];
    this.bookingRecord = new BookingRecord();
    this.data = {};
  }

  onSearchQuerySubmit(): void {
    this.showFlightList = false;
    this.bookingConfirmed = false;
    this.bookingRecord = new BookingRecord();
    this.flights = [];
    this.passengers = [];
    this.appService.search(this.searchquery).subscribe((response) => {
      this.searchquery = { origin: '', destination: '', flightDate: '' };
      this.showFlightList = true;
      this.flights = response.map((flight) => new Flight().deserialize(flight));
      console.log(this.flights);
    });
  }

  flightSelected(flight: Flight): void {
    this.showPassengerForm = true;
    this.bookingRecord.flightNumber = flight.flightNumber;
    this.bookingRecord.flightDate = flight.flightDate;
    this.bookingRecord.origin = flight.origin;
    this.bookingRecord.destination = flight.destination;
    this.bookingRecord.fare = flight.fare;
    this.bookingRecord.amount = flight.fare.amount;
    console.log('Productclicked: ', this.bookingRecord);
  }

  addPassenger() {
    this.passengers.push(this.passengerForm.value);
    console.log(this.passengers);
    this.passengerForm.reset();
    this.showPassengerDetails = true;
  }

  confirmBooking() {
    this.bookingRecord.passengers = this.passengers;
    this.appService.book(this.bookingRecord).subscribe((object) => {
      this.data = object;
      this.showFlightList = false;
      this.showPassengerDetails = false;
      if (this.data == 0) {
        this.bookingConfirmed = false;
      } else {
        this.bookingConfirmed = true;
        this.showPassengerForm = false;
      }

      console.log(this.data);
    });
  }

  ngOnInit(): void {}
}
