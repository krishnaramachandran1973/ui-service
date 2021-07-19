import { OnInit } from "@angular/core";

export class CheckInRecord
{
    id!: string;
    lastName: string;
    firstName: string;
    seatNumber: number;

    checkInTime: string;
    flightNumber: string;
    flightDate: string;
    fare!: string;
    bookingId: string;

    constructor(flight?: any, passenger?: any)
    {
        this.lastName = passenger && passenger.lastName || null;
        this.firstName = passenger && passenger.firstName || null;
        this.seatNumber = this.randomInt(1, 50);
        this.checkInTime = new Date().toISOString();
        this.flightNumber = flight && flight.flightNumber || null;
        this.flightDate = flight && flight.flightDate || null;
        this.bookingId = flight && flight.id || null;
    }

    randomInt(min: number, max: number)
    {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
