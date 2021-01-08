import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Reservations } from 'src/app/models/reservation.model';
import { CityService } from 'src/app/services/city.service';
import { CompanyService } from 'src/app/services/company.service';
import { FlightService } from 'src/app/services/flight.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { TicketService } from 'src/app/services/ticket.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {
 
  public reservations: Reservations[]
  public resNum: number
  public countOfReservations: string

  constructor(private userService: UserService, private router: Router,
    private formBuilder: FormBuilder,private flightService: FlightService,private companyService:CompanyService,
    private ticketService: TicketService,private cityService: CityService,private reservationService: ReservationService,private toastr: ToastrService) { 
    this.reservations = []

    }

  ngOnInit(): void {
    this.rReservations()
    this.rCount()
  }

  public rCount(){
    this.userService.userCountBooking(localStorage.getItem("username")).subscribe(data=>{
      if(localStorage.getItem("userType") === "user"){
        this.countOfReservations =data.toString()
      }else{
        this.countOfReservations = ""
      }
      // console.log(data)
    })
    
  }

  
  public rReservations(){
    this.reservationService.getReservations().subscribe(data=>{
      this.reservations = data
    })
    
  }

  deleteReservation(id){
    this.reservationService.deleteReservation(id).subscribe(data=>{
      this.rReservations();
      this.rCount()
    },(error) => {
      console.log(error);
      alert("Error deleting reservation")

    })
  }

  buyReservations(id){
    this.reservationService.buyReservations(id).subscribe(data=>{
      this.rReservations();
      this.rCount()
    },(error) => {
      console.log(error);
      alert("Error buying reservation")

    })

  }

  

}
