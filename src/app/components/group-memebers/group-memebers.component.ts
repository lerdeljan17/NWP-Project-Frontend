import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GroupService } from 'src/app/services/group/group.service';
import { Group } from 'src/app/models/group.model';
@Component({
  selector: 'app-group-memebers',
  templateUrl: './group-memebers.component.html',
  styleUrls: ['./group-memebers.component.css']
})
export class GroupMemebersComponent implements OnInit {
  public users: User[]
  constructor(private userService: UserService, private router: Router,
    private formBuilder: FormBuilder,private groupService: GroupService) { }

  ngOnInit(): void {
    this.rUsers()
  }

  public rUsers() {
    this.users=this.groupService.getMembers()

  }
  public deleteUser(user) {
    let n = this.users.indexOf(user)
    this.users.splice(n,1)
    this.rUsers()
  }

}
