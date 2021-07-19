import { CheckInRecord } from './../model/checkinrecord.model';
import { BookingRecord } from './../model/bookingrecord.model';
import { Flight } from './../model/flight.model';
import { SearchQuery } from './../model/searchquery.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private http: HttpClient) {}

  search(searchquery: SearchQuery): Observable<Flight[]> {
    return this.http.post('/search', searchquery).pipe(
      map((response) => {
        return (<Flight[]>response).map((flight) =>
          new Flight().deserialize(flight)
        );
      })
    );
  }

  book(bookingRecord: BookingRecord): Observable<Object> {
    return this.http.post('/booking', bookingRecord);
  }

  getBookingRecord(id: number): Observable<BookingRecord> {
    return this.http.get<BookingRecord>(`/booking/${id}`);
  }

  checkIn(checkinRecord: CheckInRecord): Observable<Object> {
    return this.http.post('/checkin', checkinRecord);
  }
}
