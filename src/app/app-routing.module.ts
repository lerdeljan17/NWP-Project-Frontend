import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeAdminComponent } from './components/home-admin/home-admin.component';
import { AuthGuardGuard } from './auth-guard.guard';
import { EditTicketComponent } from './services/edit-ticket/edit-ticket.component';
import { ReservationsComponent } from './components/reservations/reservations.component';
import { CompanyComponent } from './components/company/company.component';

const routes: Routes = [
  // http://localhost:4200/
  { path: '', component: LoginComponent},
  // http://localhost:4200/home
  { path: 'home', component: HomeAdminComponent,canActivate:[AuthGuardGuard]},
  // http://localhost:4200/reservations
  { path: 'reservations', component: ReservationsComponent,canActivate:[AuthGuardGuard],data:{authRole:"user"}},
  // http://localhost:4200/edit/ticket
  { path: 'ticket/edit/:id', component: EditTicketComponent,canActivate:[AuthGuardGuard],data:{authRole:"admin"}},
  // http://localhost:4200/company
  { path: 'company', component: CompanyComponent,canActivate:[AuthGuardGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
