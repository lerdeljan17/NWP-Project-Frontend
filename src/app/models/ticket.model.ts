import { Company } from "./company.model";
import { Flight } from "./flight.model";

export class Ticket {
    constructor( public id: number,
                 public oneWay: boolean,
                 public departDate: string,
                 public returnDate : string,
                 public company: Company,
                 public flight: Flight,
                 public count: number) {}
}