import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  username: string
  userType: string
  reservationCount: BigInteger
  @Input() reservationCountStr: string
  constructor( private router: Router,private loginService: LoginService, private userService:UserService) { }

  ngOnInit(): void {
   this.username = localStorage.getItem("username")
   this.userType =  localStorage.getItem("userType")
   this.rCount(this.username)
   
  }
 
  public rCount(username){
    this.userService.userCountBooking(this.username).subscribe(data=>{
      this.reservationCount = data
      if(this.userType === "user"){
        this.reservationCountStr =data.toString()
      }else{
        this.reservationCountStr = ""
      }
      console.log(data)
    })
    
  }

  public isAdmin(){
    if(this.userType === "admin"){
      return true
    }
    return false
  }

 
  public logout(){
    this.loginService.logout()
    this.router.navigate([''])
    
  }
  

}
