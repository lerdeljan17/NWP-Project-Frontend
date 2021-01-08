import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup
  Uname: string
  error: string;
  constructor(private loginService: LoginService,
              private router: Router,
              private formBuilder: FormBuilder) {
                
    this.loginForm = this.formBuilder.group({
      // Odgovarajuce HTML elemente cemo povezati atributom formControlName="..."
      // ['default value', [validators]
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    })
  }

  ngOnInit(): void {
  }

  public get username(){
    return this.loginForm.get('username')
  }

  public get password(){
    return this.loginForm.get('password')
  }


  public submitForm(credentials){
    this.loginService.login(credentials).subscribe(data => {
      console.log(data)
      this.router.navigate(['/home'])
    },
    error => {
      console.log(error)
      this.error = error;
       alert("Error loging in")

    })
    this.Uname = credentials.username
    console.log(this.Uname)
  }
}
