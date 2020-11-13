import { Component, Input, OnInit, ɵConsole } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-date-pipe-component',
  templateUrl: './date-pipe-component.component.html',
  styleUrls: ['./date-pipe-component.component.css']
})
export class DatePipeComponentComponent implements OnInit {

  @Input()
  username: string
  
  today: number = Date.now();

  constructor(private loginService : LoginService) {
    
    
    
   }

  ngOnInit(): void {
    this.username = this.getUsername()
    // console.log("je ime " +this.username)
  }

  public getUsername(){
    this.username = this.loginService.uname
    return this.username
  }

  

  

 
}
