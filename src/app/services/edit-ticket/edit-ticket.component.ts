import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
import { tick } from '@angular/core/testing';

@Component({
  selector: 'app-edit-ticket',
  templateUrl: './edit-ticket.component.html',
  styleUrls: ['./edit-ticket.component.css']
})
export class EditTicketComponent implements OnInit {

  public editTicketForm: FormGroup
  public selectedFlight: Flight
  public oneWay : boolean
  public selectedCompany: Company
  public ticket:TicketTable
  public flights: Flight[]
  public companies: Company[]

  constructor(private userService: UserService, private router: Router,
    private formBuilder: FormBuilder,private flightService: FlightService,private companyService:CompanyService,
    private ticketService: TicketService,private cityService: CityService,private reservationService: ReservationService,private activatedRoute: ActivatedRoute) { 
      this.flights = []
      this.ticket = new TicketTable(0,true,"","","","","",0,0);
      this.companies = []
      this.editTicketForm = this.formBuilder.group({
        // Odgovarajuce HTML elemente cemo povezati atributom formControlName="..."
        // ['default value', [validators]
        departDate: [''],
        returnDate: [''],
        count:  ['']
        
      })
    }

    public get departDate(){
      return this.editTicketForm.get('departDate')
    }
  
    public get returnDate(){
      return this.editTicketForm.get('returnDate')
    }
    public get count(){
      return this.editTicketForm.get('count')
    }

    
    public editTicket(data){


      let bodyO = {
        oneWay : this.oneWay,
        departDate: data.departDate,
        returnDate: data.returnDate,
        company: this.selectedCompany.id,
        flight: this.selectedFlight.id,
        count: data.count
      }
      this.activatedRoute.paramMap.subscribe(params => {
        const id: number = Number(params.get('id'))
        

        // let  ticket  = new Ticket(null,this.oneWay,data.departDate,
          // data.returnDate,this.selectedCompany,this.selectedFlight,data.count)
        this.ticketService.editTicket(bodyO,id).subscribe(data =>{
          this.router.navigate["/home"]
        })
      },(error) => {
        console.log(error);
        alert("Error editing ticket")

      })

      // console.log(this.selectedCompany.id)
      // console.log(this.selectedFlight.id)
      
    }

  ngOnInit(): void {
    this.rFlights();
    this.rCompanies();
    this.activatedRoute.paramMap.subscribe(params => {
      const id: number = Number(params.get('id'))
      console.log(id)

      this.ticketService.fetchTickets("null").subscribe((tickets: TicketTable[]) => {
        this.ticket = tickets.filter(ticket => ticket.id === id)[0]
        this.oneWay = this.ticket.oneWay
        this.selectedCompany = this.companies.filter(company => company.name === this.ticket.company)[0]
        this.selectedFlight = this.flights.filter(flight => flight.id === this.ticket.flight)[0]
        
      })
    })
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

}
