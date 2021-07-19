import { AppService } from './../service/app.service';
import { Passenger } from './../model/passenger.model';
import { CheckInRecord } from './../model/checkinrecord.model';
import { BookingRecord } from './../model/bookingrecord.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.css'],
})
export class CheckinComponent implements OnInit {
  bookingid!: number;
  checkinId!: Object;

  bookingRecord: BookingRecord;
  checkInRecord: CheckInRecord;
  showPassengers: boolean = false;
  showCheckIn: boolean = false;
  passengers: Passenger[];

  constructor(private appService: AppService) {
    this.bookingRecord = new BookingRecord();
    this.checkInRecord = new CheckInRecord();
    this.bookingRecord.passengers = [];
    this.passengers = [];
  }

  findBookingRecord() {
    this.showCheckIn = false;
    console.log(this.bookingid);
    this.appService.getBookingRecord(this.bookingid).subscribe((br) => {
      this.bookingRecord = new BookingRecord().deserialize(br);
      this.passengers = this.bookingRecord.passengers.map((p) =>
        new Passenger().deserialize(p)
      );
      console.log(this.bookingRecord);
      this.showPassengers = true;
      this.bookingid = 0;
    });
  }

  checkIn(passenger: Passenger) {
    this.showCheckIn = false;
    this.checkInRecord = new CheckInRecord(this.bookingRecord, passenger);
    console.log(this.checkInRecord);
    this.appService.checkIn(this.checkInRecord).subscribe((object) => {
      this.checkinId = object;
      this.showCheckIn = true;
      this.passengers = this.passengers.filter((p) => p.id != passenger.id);
      console.log(this.passengers);
    });
  }

  ngOnInit(): void {}
}
