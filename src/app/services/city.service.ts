import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { City } from '../models/city.model';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private http: HttpClient) { }

  private readonly citiesUrl = 'http://localhost:8080/api/cities'
  //private flights: Observable<Ticket[]>
  private cities: Observable<City[]>
     
  public fetchCities(): Observable<City[]> {
     
    this.cities = this.http.get<City[]>(this.citiesUrl.concat("/all"), {
     params: {
     }, headers: {
      //  Authorization: 'Bearer '.concat(localStorage.getItem("jwt"))
     }
   })
   //console.log('Bearer '.concat(localStorage.getItem("jwt")))
   //console.log(this.users) 
   return this.cities
  }
}
