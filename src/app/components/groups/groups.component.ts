import { Component, OnInit } from '@angular/core';
import { Group } from 'src/app/models/group.model';
import { GroupService } from 'src/app/services/group/group.service';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  public groups: Group[]
  constructor(private router: Router,private userService: UserService,private groupService:GroupService) {
    this.groups = groupService.getGroups()
   }

  ngOnInit(): void {
  }

  public showMembers(g:Group) {
    this.groupService.setGroup(g)
    this.router.navigate(['/groups',g.groupName])
  }

}
