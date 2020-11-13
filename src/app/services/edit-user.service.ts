import { Injectable } from '@angular/core';
import { HttpClient, HttpParams ,HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EditUserService {

  private readonly editUrl = ' http://localhost:8080/users'
  constructor(private http: HttpClient) { }

  
  editUser(d) {
    let bodyObj = {
      id : d.number,
      firstName : d.firstName,
      lastName : d.lastName
    };
    let headers = {Authorization : 'Bearer '.concat(localStorage.getItem("jwt"))}
    return this.http.put(this.editUrl, bodyObj, {headers})
  }
}
