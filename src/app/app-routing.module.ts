import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { LoginComponent } from './components/login/login.component';
import { EditComponent } from './components/edit/edit.component';
import { GroupsComponent } from './components/groups/groups.component';
import { GroupMemebersComponent } from './components/group-memebers/group-memebers.component';

const routes: Routes = [
  // http://localhost:4200/
  { path: '', component: LoginComponent},
  // http://localhost:4200/home
  { path: 'home', component: UserListComponent},
  // http://localhost:4200/users
  { path: 'users/:id', component: UserDetailsComponent},
  // http://localhost:4200/edit
  { path: 'edit/:id', component: EditComponent},
  // http://localhost:4200/groups
  { path: 'groups', component: GroupsComponent},
  // http://localhost:4200/groups
  { path: 'groups/:groupName', component: GroupMemebersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
