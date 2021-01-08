import { Flight } from "./flight.model";
import { TicketTable } from "./TicketTable.model";

export class Reservations {
    constructor(
        public id: number,
        public isAvailable:boolean,
        public flight: number,
        public user: number,
        public username: string,
        public ticket: number,
        public count: number,
        public ticketResponseDto: TicketTable
                 ) {}
}