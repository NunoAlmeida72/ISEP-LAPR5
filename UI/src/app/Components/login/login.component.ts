import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { Role } from '../../Interfaces/role';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Interfaces/user';
import { catchError, of, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  roles!:Role[];
  user:User={};
  userLogged:any|undefined;
  firstFormGroup!: FormGroup;
  

  constructor(private authService:AuthService,private _formBuilder:FormBuilder,private router:Router,private _snackBar:MatSnackBar){
  }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  async login(){
    if(this.firstFormGroup.get("email")?.value && this.firstFormGroup.get("password")?.value){
      this.user.email=this.firstFormGroup.get("email")?.value;
      this.user.password=this.firstFormGroup.get("password")?.value;
      this.userLogged= await this.authService.sign_in(this.user);
      if(this.userLogged && this.userLogged.userDTO && this.userLogged.token){
        this.authService.login(this.userLogged.token,this.userLogged.userDTO.role)
        this.router.navigate([""]);
      }else{
        this._snackBar.open("Couldn't login! Reason: "+ this.userLogged.error.errors.message,'Close',{duration:3000});
      }
    }
  }

  register() {
    this.router.navigate(["register-user"]);
  }

}
