import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { EditUserService } from 'src/app/services/edit-user.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  public user: User
  public loginForm: FormGroup
  constructor(private editService: EditUserService,private userService: UserService, private router: Router,
    private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute) {
    this.user = new User(0, "", "")
    this.loginForm = this.formBuilder.group({
      // Odgovarajuce HTML elemente cemo povezati atributom formControlName="..."
      // ['default value', [validators]
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      number: ['',]
    })
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
  public get firstName() {
    return this.loginForm.get('firstName')
  }

  public get lastName() {
    return this.loginForm.get('lastName')
  }

  public get number() {
    return this.loginForm.get('number')
  }

  public submitForm(d) {
   // console.log(d.number)
    this.editService.editUser(d).subscribe(data => {
      this.router.navigate(['/home'])
    })
  }

}
