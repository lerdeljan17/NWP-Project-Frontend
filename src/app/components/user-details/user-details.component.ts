import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/models/user.model';
import { ActivatedRoute } from '@angular/router';
import { GroupService } from 'src/app/services/group/group.service';
import { Group } from 'src/app/models/group.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  public user: User
  public groupMembers: User[]
  public groups: Group[]
  public selected : string

  constructor(private userService: UserService,
              private groupService: GroupService,
              private activatedRoute: ActivatedRoute) {
                this.groupMembers = []
                this.user = new User(0, "", "")
                this.groups = groupService.getGroups()
                this.selected=this.groups[0].groupName

  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const id: number = Number(params.get('id'))
      console.log(id)
      
      this.userService.getUsers().subscribe((users: User[]) => {
        console.log(users)
        this.user = users.filter(user => user.id === id)[0]
      })
    })
  }

  onChange(deviceValue) {
  
    this.selected = deviceValue
    console.log(this.selected);

}


  
  public addToGroup(user: User) {
    //console.log("bla"+this.selected)
    this.groupService.addMember(user,this.selected)
  }
  
  // public showGroup() {
  //   this.groupMembers = this.groupService.getMembers()
  // }
  // public clearGroup() {
  //   this.groupService.clearGroup()
  //   this.showGroup()
  // }
}
