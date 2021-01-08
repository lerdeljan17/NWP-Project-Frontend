import { City } from "./city.model";
import { Ticket } from "./ticket.model";

export class Flight {
    constructor( public id: number,
                 public origin: City,
                 public destination: City,
                 public tickets: Array<Ticket>
                 ) {}

    public toString(){
    return this.origin.name.toString + " -> " + this.destination.name.toString
}
}