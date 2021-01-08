import { Company } from "./company.model";
import { Flight } from "./flight.model";

export class TicketTable {
    constructor( public id: number,
                 public oneWay: boolean,
                 public departDate: string,
                 public returnDate : string,
                 public company: string,
                 public origin: string,
                 public destination:string,
                 public count: number,
                 public flight:number) {}
}