import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Flight } from '../models/flight.model';
@Injectable({
  providedIn: 'root'
})
export class FlightService {
  private readonly flightsUrl = 'http://localhost:8080/api/flights'
  private flights: Observable<Flight[]>
  constructor(private http: HttpClient) { }

  public fetchFlights(): Observable<Flight[]> {
    this.flights = this.http.get<Flight[]>(this.flightsUrl.concat("/all"), {
     params: {
     
     }, headers: {
      //  Authorization: 'Bearer '.concat(localStorage.getItem("jwt"))
     }
   })
   //console.log('Bearer '.concat(localStorage.getItem("jwt")))
   //console.log(this.users) 
   return this.flights
  }
}
