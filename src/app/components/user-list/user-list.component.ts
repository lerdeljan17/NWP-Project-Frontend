import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GroupService } from 'src/app/services/group/group.service';
import { Group } from 'src/app/models/group.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  public loginForm: FormGroup
  public groupForm: FormGroup

  public users: User[]

  // Pomocu parametra u konstruktoru injektujemo UserService instancu u UserListComponent
  constructor(private userService: UserService, private router: Router,
    private formBuilder: FormBuilder,private groupService: GroupService) {
      this.loginForm = this.formBuilder.group({
        // Odgovarajuce HTML elemente cemo povezati atributom formControlName="..."
        // ['default value', [validators]
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        number: ['', Validators.required]
      })
      this.groupForm = this.formBuilder.group({
        groupName: ['', Validators.required],
      })
  }

  ngOnInit(): void {
    this.rUsers()
  }

  public get groupName(){
    return this.groupForm.get('groupName')
  }

  public get firstName(){
    return this.loginForm.get('firstName')
  }

  public get lastName(){
    return this.loginForm.get('lastName')
  }

  public get number(){
    return this.loginForm.get('number')
  }

  public submitForm(credentials){
    this.userService.addUser(credentials).subscribe(users => {
      console.log(users)
      
      
    })
    this.rUsers()

  }

  public addGroup(data){
    let toAdd : Group = new Group([],data.groupName)
    this.groupService.addGroup(toAdd)

  }

  public rUsers() {
    this.userService.fetchUsers().subscribe(users => {
      console.log(users)
      this.users = users
    })
  }

  public deleteUser(id: string) {
    
    this.userService.deleteUser(id).subscribe(
      (response) => {
        console.log(response)
        this.rUsers()
      },
      (error) => {
        console.log(error)
      }
    )
    this.groupService.deleteUser(id);
  }

}
