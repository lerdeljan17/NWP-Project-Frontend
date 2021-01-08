import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ticket } from '../models/ticket.model';
import { tick } from '@angular/core/testing';
import { TicketTable } from '../models/TicketTable.model';
@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private readonly ticketsUrl = 'http://localhost:8080/api/tickets'
  //private flights: Observable<Ticket[]>
  private tickets: Observable<TicketTable[]>

  constructor(private http: HttpClient) { }
  public addTicket(ticket: Ticket){
    let bodyO = {
      oneWay : ticket.oneWay,
      departDate: ticket.departDate,
      returnDate: ticket.returnDate,
      company: ticket.company.id,
      flight: ticket.flight.id,
      count: ticket.count
    }
    return this.http.post(this.ticketsUrl,bodyO,{
      headers: {
       // Authorization: 'Bearer '.concat(localStorage.getItem("jwt"))
      }
    })
    //this.fetchUsers()
    // console.log(s)
   }

   
   public fetchTickets(oneWay): Observable<TicketTable[]> {
     
    this.tickets = this.http.get<TicketTable[]>(this.ticketsUrl.concat("/all"), {
     params: {
       oneWay: oneWay
     }, headers: {
      //  Authorization: 'Bearer '.concat(localStorage.getItem("jwt"))
     }
   })

   return this.tickets
  }

  public fetchTicketsCompany(company): Observable<TicketTable[]> {
     
    this.tickets = this.http.get<TicketTable[]>(this.ticketsUrl.concat("/company"), {
     params: {
       company: company
     }, headers: {
      //  Authorization: 'Bearer '.concat(localStorage.getItem("jwt"))
     }
   })

   return this.tickets
  }

  public filterTicketsbyCompany(data,origin,destination): Observable<TicketTable[]> {

    // console.log(origin)
    // console.log(destination)
    // console.log(data.departDateT)
    let dest
    let orig
    if(destination === undefined){
      dest = ""
    } else{
      dest = destination.name
    }
    if(origin === undefined) {
      orig = ""
    } else{
      orig = origin.name
    }
    
    
    this.tickets = this.http.get<TicketTable[]>(this.ticketsUrl.concat("/filterTicketsCompany"), {
      params: {
       origin: orig,
       destination: dest,
       departDate: data.departDateT,
       returnDate: data.returnDateT,
       company: localStorage.getItem("company")
     }, headers: {
      //  Authorization: 'Bearer '.concat(localStorage.getItem("jwt"))
     }
   })
   //console.log('Bearer '.concat(localStorage.getItem("jwt")))
   //console.log(this.users) 
   return this.tickets
  }

     
  public filterTickets(data,origin,destination): Observable<TicketTable[]> {

    // console.log(origin)
    // console.log(destination)
    // console.log(data.departDateT)
    let dest
    let orig
    if(destination === undefined){
      dest = ""
    } else{
      dest = destination.name
    }
    if(origin === undefined) {
      orig = ""
    } else{
      orig = origin.name
    }
    
    
    this.tickets = this.http.get<TicketTable[]>(this.ticketsUrl.concat("/filterTickets"), {
      params: {
       origin: orig,
       destination: dest,
       departDate: data.departDateT,
       returnDate: data.returnDateT
     }, headers: {
      //  Authorization: 'Bearer '.concat(localStorage.getItem("jwt"))
     }
   })
   //console.log('Bearer '.concat(localStorage.getItem("jwt")))
   //console.log(this.users) 
   return this.tickets
  }

  public deleteTicket(id){
    var s : string = this.ticketsUrl +"/"+id
    return this.http.delete(s,{
      headers: {
        // Authorization: 'Bearer '.concat(localStorage.getItem("jwt"))
      }
    })
    //this.fetchUsers()
    // console.log(s)
   }

   
  public editTicket(ticket,id){
    var s : string = this.ticketsUrl +"/"+id
    return this.http.put(s,ticket)
   }

}

