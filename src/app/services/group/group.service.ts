import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Group } from 'src/app/models/group.model';
import { ActivatedRoute } from '@angular/router';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private group: Group
  private groups: Group[]
  constructor( private activatedRoute: ActivatedRoute) {
    this.group = new Group([], "")
    //this.groups.push(this.group)
    this.groups = []
  }

  public getGroups(){
    return this.groups
  }

  public addGroup(g : Group){
    if(!this.groups.some(u => { return u.groupName === g.groupName })) { 
      // Ako .some vrati true, taj clan vec postoji u grupi i necemo ga dodati
      this.groups.push(g)
    }
    console.log(JSON.stringify(this.groups))
  }

  public printGroups(){

  }

  public getGroupName(): string {
    return this.group.groupName
  }

  public setGroup(G : Group){
    this.group = G
  }

  public getMembers(): User[] {
    
    // this.activatedRoute.paramMap.subscribe(params => {
    //   const groupName: String = String(params.get('groupName'))
    //   console.log(groupName)
    //   let addTo = this.groups.find(e => e.groupName === groupName);
    //   this.group = addTo
    //   })
      console.log(this.group.groupName)
      return this.group.users
    
    
  }

  public addMember(user: User,group:string) {
    let addTo = this.groups.find(e => e.groupName === group);
    if( addTo.users.length ==0 || !addTo.users.some(u => { return u.firstName === user.firstName })) { 
      // Ako .some vrati true, taj clan vec postoji u grupi i necemo ga dodati
      addTo.users.push(user)
    }
    console.log(addTo.users.length)
  }
  
  public clearGroup(): void {
    this.group.users = []
  }

  public deleteUser(id:string): void {
    for(var i = 0 ; i<this.groups.length;i++){
      for(var j = 0 ; j<this.groups[i].users.length;j++){
        if(this.groups[i].users[j].id === Number(id)){
          this.groups[i].users.splice(j,1)
        }
      }
    }
  }
}
