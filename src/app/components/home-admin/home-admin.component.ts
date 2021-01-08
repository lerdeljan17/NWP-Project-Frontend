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
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {
  public addUserForm: FormGroup
  public filterTicketsFrorm: FormGroup
  public addTicketForm: FormGroup
  public selected : string
  public selectedWay: string
  public selectedFlight: Flight
  public selectedCompany: Company
  public flights: Flight[]
  public tickets: TicketTable[]
  public oneWay : boolean
  public companies: Company[]
  public cities: City[]
  public selectedOrigin: City;
  public selectedDestination: City;
  public resNum: number
  public countOfReservations: string
  constructor(private userService: UserService, private router: Router,
    private formBuilder: FormBuilder,private flightService: FlightService,private companyService:CompanyService,
    private ticketService: TicketService,private cityService: CityService,private reservationService: ReservationService,private toastr: ToastrService) { 
      this.flights = []
      this.companies = []
      this.tickets = []
      this.selectedFlight = null
      this.oneWay = false
      this.selectedWay = "All"
      this.selected = "admin"
      this.resNum = 0
      
      
      this.addUserForm = this.formBuilder.group({
      // Odgovarajuce HTML elemente cemo povezati atributom formControlName="..."
      // ['default value', [validators]
      username: ['', Validators.required],
      password: ['', Validators.required],
      
    })

    this.addTicketForm = this.formBuilder.group({
      // Odgovarajuce HTML elemente cemo povezati atributom formControlName="..."
      // ['default value', [validators]
      departDate: ['', Validators.required],
      returnDate: ['', Validators.required],
      count:  ['', Validators.required]
      
    })

    this.filterTicketsFrorm = this.formBuilder.group({
      // Odgovarajuce HTML elemente cemo povezati atributom formControlName="..."
      // ['default value', [validators]
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

  public get departDate(){
    return this.addTicketForm.get('departDate')
  }

  public get returnDate(){
    return this.addTicketForm.get('returnDate')
  }
  public get count(){
    return this.addTicketForm.get('count')
  }
    public get username(){
      return this.addUserForm.get('username')
    }
  
    public get password(){
      return this.addUserForm.get('password')
    }
  

    public submitForm(credentials){
      this.userService.addUser(credentials,this.selected).subscribe(users => {
        console.log(users)
        
        
      },
        (error) => {
        console.log(error);
        alert("Error registering new user")

      })  
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

    public reserve(data){
      if(this.resNum >= parseInt(data.count)){
        // this.toastr.error("to many","error");
        console.log("too many reservations")
        alert("cant reserve more tickets than available")
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
          alert("Error reserving ticket")

        }
      )

    }

    public addTicket(data){
      console.log(data.returnDate)
      console.log(this.oneWay)
      // let companyID
      // this.companies.forEach((currentValue,index) => {
      //   if( currentValue.name === this.selectedCompany){
      //       //console.log(currentValue.id)
      //       //this.companies.splice(index, 1);
      //      companyID = currentValue.id
      //   }
      // });
      console.log(this.selectedCompany.id)
      console.log(this.selectedFlight.id)
      let  ticket  = new Ticket(null,this.oneWay,data.departDate,
        data.returnDate,this.selectedCompany,this.selectedFlight,data.count)
      this.ticketService.addTicket(ticket).subscribe(data =>{
        this.rTickets("null");
      },(error) => {
        console.log(error)
        alert("Error adding ticket on server")
      })
    }
  
    deleteTicket(ticketId){
      console.log(ticketId)
      this.ticketService.deleteTicket(ticketId).subscribe(
        (response) => {
          console.log(response)
          // this.rTickets(this.selectedWay)
          this.onChangeSelectedWay(this.selectedWay)
        },
        (error) => {
          console.log(error)
           alert("Error deleting ticket on server")
          
        }
      )
    }
    onChange(deviceValue) {
  
      this.selected = deviceValue
      console.log(this.selected);
      
  
  }
  onChangeSelectedWay(deviceValue) {
    this.selectedWay = deviceValue
    if(deviceValue === "oneWay"){
      this.rTickets(true)
    }else if(deviceValue === "TwoWay"){
      this.rTickets(false)
    }else{
      this.rTickets(null)
    }
}

  
  ngOnInit(): void {
    this.rFlights()
    this.rCompanies()
    this.rTickets(null)
    this.rCities()
  }

  public rTickets(oneWay) {
    this.ticketService.fetchTickets(oneWay).subscribe(tickets => {
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

  public company(name){
    localStorage.setItem("company",name);
    this.router.navigateByUrl("/company");
  }
  
  public rFlights() {
    this.flightService.fetchFlights().subscribe(flights => {
      // console.log(users)
      // this.users = users
      this.flights = flights
    })
  }

  public rCompanies() {
    this.companyService.fetchCompanies().subscribe(companies => {
      // console.log(users)
      // this.users = users
      console.log(companies)
      this.companies = companies
    })
  }

  public isAdmin(){
    if(localStorage.getItem("userType") === "admin"){
      // console.log(localStorage.getItem("userType"))
      return true
    }
    return false
  }

  public filterTickets(data){
    // console.log(data)
    this.ticketService.filterTickets(data,this.selectedOrigin,this.selectedDestination).subscribe(tickets => {
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

}
