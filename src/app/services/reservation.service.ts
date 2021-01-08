import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reservations } from '../models/reservation.model';
@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private reservations: Observable<Reservations[]>
  
  private readonly reservationsUrl = 'http://localhost:8080/api/reservations'
  constructor(private http: HttpClient) { }

  public addReservation(data,resNum){
    let bodyO = {
        "available" : true,
        "flight" : data.flight,
        "username" :localStorage.getItem("username"),
        "ticket": data.id,
        "count": resNum
    }
    return this.http.post(this.reservationsUrl,bodyO,{
      headers: {
       // Authorization: 'Bearer '.concat(localStorage.getItem("jwt"))
      }
    })
    //this.fetchUsers()
    // console.log(s)
   }

   public getReservations():Observable<Reservations[]>{
    this.reservations = this.http.get<Reservations[]>(this.reservationsUrl.concat("/userReservations"),{params:{
       username:localStorage.getItem("username")
     }})
     return this.reservations
   }

   public deleteReservation(id){
    var s : string = this.reservationsUrl +"/"+id
    return this.http.delete(s)
   }

   
  //  public buyReservations(id){
  //   var s : string = this.reservationsUrl+"/buyReservations/"+id;
  //   console.log(localStorage.getItem("username"))
  //   return this.http.put(s,{params:{
  //     username:localStorage.getItem("username")
  //   }})
  //  }

   public buyReservations(id){
    var s : string = this.reservationsUrl+"/buyReservations/"+id;
    console.log(s)
    return this.http.get(s,{params:{
       username:localStorage.getItem("username")
     }})
     
   }

}
