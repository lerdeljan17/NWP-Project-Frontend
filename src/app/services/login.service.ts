import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpParams ,HttpHeaders} from '@angular/common/http';
import { Credentials } from '../models/credentials.model';
import { map } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class LoginService implements OnDestroy {

  private readonly loginUrl = 'http://localhost:8080/api/users/login'
  uname: string
  constructor(private http: HttpClient) { }

  ngOnDestroy(): void {
    this.logout()
  }

  login(credentials) {
    let httpParams = new HttpParams()
    httpParams.append("username", credentials.username)
    let bodyO = {
      username: credentials.username,
      password: credentials.password,
    }
    return this.http.post(this.loginUrl,bodyO, {
      params: {
        
      }, headers: {
        skip: "true"
      }
    }).pipe(map((responseData: Credentials) => {
      console.log(responseData)
      // localStorage.setItem("jwt", responseData.JWT)
      localStorage.setItem("username",responseData.username)
      localStorage.setItem("userType",responseData.userType)
      localStorage.setItem("jwt",responseData.jwt)
      //localStorage.setItem("id",responseData.id)
      //this.uname = responseData.username
    }))
  }

  postExample(data) {
    this.http.post(this.loginUrl, data)
  }

  // editUser(credentials) {
  //   // console.log(credentials.firstName)
  //   return this.http.put('http://localhost:8080/users', {
  //     headers: {
  //       Authorization: 'Bearer '.concat(localStorage.getItem("jwt"))

  //     },body:{
  //       id : credentials.number,
  //       firstName : credentials.firstName,
  //       lastName : credentials.lastName
  //     }
  //   })
  // }

  // editUser(d) {
  //   let bodyObj = {
  //     id : d.number,
  //     firstName : d.firstName,
  //     lastName : d.lastName
  //   };
  //   let headers = {Authorization : 'Bearer '.concat(localStorage.getItem("jwt"))}
  //   return this.http.put('http://localhost:8080/users', bodyObj, {headers})
  // }


  logout() {
    //localStorage.removeItem("jwt")
    localStorage.removeItem("username")
    localStorage.removeItem("userType")
    localStorage.removeItem("jwt")


  }

  getJwt(){
    return localStorage.getItem("jwt");
  }

  userLogged(){
    if(localStorage.getItem("username") != undefined){
      return true
    }else{
      return false
    }
  }

  
}
