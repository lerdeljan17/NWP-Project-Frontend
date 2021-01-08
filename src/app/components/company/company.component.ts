import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Flight } from 'src/app/models/flight.model';
import { FlightService } from 'src/app/services/flight.service';
import { CompanyService } from 'src/app/services/company.service';
import { Company } from 'src/app/models/company.model';
import { cpuUsage } from 'process';
import { TicketService } from 'src/app/services/ticket.service';
import { Ticket } from 'src/app/models/ticket.model';
import { TicketTable } from 'src/app/models/TicketTable.model';
import { City } from 'src/app/models/city.model';
import { CityService } from 'src/app/services/city.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  public filterTicketsFrorm: FormGroup
  public addCompanyForm: FormGroup
  public editCompanyForm: FormGroup

  public companyCurr:string
  
  public resNum: number
  public countOfReservations: string
  public selectedOrigin: City;
  public selectedDestination: City;
  public cities: City[]
  public tickets: TicketTable[]
  


  constructor(private userService: UserService, private router: Router,
    private formBuilder: FormBuilder,private flightService: FlightService,private companyService:CompanyService,
    private ticketService: TicketService,private cityService: CityService,private reservationService: ReservationService,private toastr: ToastrService) {

      this.resNum = 0
      this.tickets = []
      this.cities = []
      this.companyCurr = localStorage.getItem("company")

      this.editCompanyForm = this.formBuilder.group({
        companyNameE: ['', Validators.required],
        
      })


      this.addCompanyForm = this.formBuilder.group({
        companyName: ['', Validators.required],
        
      })

      this.filterTicketsFrorm = this.formBuilder.group({
        departDateT: [''],
        returnDateT: ['']
        
      })
    
    }

    public get departDateT(){
      return this.filterTicketsFrorm.get('departDateT')
    }
  
    public get returnDateT(){
      return this.filterTicketsFrorm.get('returnDateT')
    }

    
    public get companyNameE(){
      return this.editCompanyForm.get('companyNameE')
    }

    public get companyName(){
      return this.addCompanyForm.get('companyName')
    }

    public addCompany(name){
      this.companyService.addComapny(name).subscribe(data=>{},(error) => {
        console.log(error);
        alert("Error adding company")
        

      })
    }

    
    public editCompany(data){
      this.companyService.editComapny(data).subscribe(data =>{
        this.companyCurr = data.name;
        localStorage.setItem("company",data.name)
      },
      (error) => {
        console.log(error);
        alert("Error editing company")

      })
    }

    public deleteCompany(){
      this.companyService.deleteCompany(this.companyCurr).subscribe(
        (response) => {
          console.log(response)
          // this.rTickets(this.selectedWay)
          this.router.navigateByUrl("/home");
        },
        (error) => {
          console.log(error)
          alert("Error deleting company")
        }
      )

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
    public isAdmin(){
      if(localStorage.getItem("userType") === "admin"){
        // console.log(localStorage.getItem("userType"))
        return true
      }
      return false
    }

    public rTickets() {

      this.ticketService.fetchTicketsCompany(localStorage.getItem("company")).subscribe(tickets => {
        // console.log(users)
        // this.users = users
        console.log(tickets)
        this.tickets = tickets
      })
    }

    public rCities() {
      this.cityService.fetchCities().subscribe(cities => {
        // console.log(users)
        // this.users = users
        console.log(cities)
        this.cities = cities
      })
    }

    public reserve(data){
      if(this.resNum >= parseInt(data.count)){
        // this.toastr.error("to many","error");
        console.log("too many reservations")
        return
      }
      console.log(this.resNum)
      this.reservationService.addReservation(data,this.resNum).subscribe(
        (response) => {
          console.log(response);
          this.rCount();
          
        },
        (error) => {
          console.log(error);
          alert("Error making reservation")
        }
      )

    }

    deleteTicket(ticketId){
      console.log(ticketId)
      this.ticketService.deleteTicket(ticketId).subscribe(
        (response) => {
          console.log(response)
          this.rTickets()
        },
        (error) => {
          console.log(error)
          alert("Erro deleting ticket")
        }
      )
    }

    public filterTickets(data){
      // console.log(data)
      this.ticketService.filterTicketsbyCompany(data,this.selectedOrigin,this.selectedDestination).subscribe(tickets => {
        // console.log(users)
        // this.users = users
        //console.log(tickets)
        this.tickets = tickets
      })
      this.filterTicketsFrorm.reset({
        departDateT:"",
        returnDateT:""
       })
       this.selectedOrigin = undefined
       this.selectedDestination = undefined
    }


  ngOnInit(): void {
    this.companyCurr = localStorage.getItem("company")
    this.rCities();
    // this.rCount();
    this.rTickets();
    
  }

}
