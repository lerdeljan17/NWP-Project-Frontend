import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from '../models/company.model';
@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private readonly companiesUrl = 'http://localhost:8080/api/companies'
  private companies: Observable<Company[]>
  constructor(private http: HttpClient) { }

  public fetchCompanies(): Observable<Company[]> {
    this.companies = this.http.get<Company[]>(this.companiesUrl.concat("/all"), {
     params: {
     }, headers: {
      //  Authorization: 'Bearer '.concat(localStorage.getItem("jwt"))
     }
   })
   //console.log('Bearer '.concat(localStorage.getItem("jwt")))
   //console.log(this.users) 
   return this.companies
  }

  public addComapny(data){
    let bodyO = {
      name:data.companyName
    }
    return this.http.post(this.companiesUrl,bodyO,{
      headers: {
       // Authorization: 'Bearer '.concat(localStorage.getItem("jwt"))
      }
    })
    //this.fetchUsers()
    // console.log(s)
   }

   public editComapny(data){
    var s : string = this.companiesUrl +"/editCompany/"+localStorage.getItem("company")
    return this.http.put<Company>(s,data.companyNameE)
   }


   public deleteCompany(data){
    var s : string = this.companiesUrl +"/"+data
    return this.http.delete(s,{
      headers: {
        // Authorization: 'Bearer '.concat(localStorage.getItem("jwt"))
      }
    })
    //this.fetchUsers()
    // console.log(s)
   }


}
