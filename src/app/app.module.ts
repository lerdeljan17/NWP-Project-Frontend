import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from './http-error.interceptor';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeAdminComponent } from './components/home-admin/home-admin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { JWTInterceptor } from './interceptor';
import { EditTicketComponent } from './services/edit-ticket/edit-ticket.component';
import { ReservationsComponent } from './components/reservations/reservations.component';
import { CompanyComponent } from './components/company/company.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    HomeAdminComponent,
    EditTicketComponent,
    ReservationsComponent,
    CompanyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
  ],
  providers: [{

    provide: HTTP_INTERCEPTORS,

    useClass: JWTInterceptor,

    multi: true

  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
