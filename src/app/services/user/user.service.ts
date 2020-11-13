import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

// Injectable omogucava dependancy injection https://angular.io/guide/dependency-injection
// providedIn oznacava na kom nivou ce biti dostupna instanca ovog servisa
// 'root' znaci da je UserService singleton na nivou cele aplikacije
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly usersUrl = 'http://localhost:8080/users'
  private users: Observable<User[]>

  constructor(private http: HttpClient) {
    // this.users = [new User(0, "Pera", "Peric", "12334567890"),
    //               new User(1, "Laza", "Lazic", "0987654321")]
   }

   public getUsers(): Observable<User[]> {
     return this.users
   }

   public fetchUsers(): Observable<User[]> {
     this.users = this.http.get<User[]>(this.usersUrl, {
      params: {
      }, headers: {
        Authorization: 'Bearer '.concat(localStorage.getItem("jwt"))
      }
    })
    //console.log('Bearer '.concat(localStorage.getItem("jwt")))
    //console.log(this.users) 
    return this.users
   }
   public deleteUser(id : string){
    var s : string = this.usersUrl +"/"+id
    return this.http.delete(s,{
      headers: {
        Authorization: 'Bearer '.concat(localStorage.getItem("jwt"))
      }
    })
    //this.fetchUsers()
    // console.log(s)
   }

   public addUser(u){
    let bodyO = {
      id : u.number,
      firstName : u.firstName,
      lastName : u.lastName
    }
    return this.http.post(this.usersUrl,bodyO,{
      headers: {
        Authorization: 'Bearer '.concat(localStorage.getItem("jwt"))
      }
    })
    //this.fetchUsers()
    // console.log(s)
   }

   
 

   

   
}
