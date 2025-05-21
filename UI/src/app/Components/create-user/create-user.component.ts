import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, of, tap } from 'rxjs';
import { Role } from 'src/app/Interfaces/role';
import { User } from 'src/app/Interfaces/user';
import { RoleService } from 'src/app/Services/role.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {

  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;

  isLinear=true;

  roles?:Role[];
  user:User={};

  

  constructor(private roleService:RoleService,private userService:UserService,private _snackBar:MatSnackBar,private _formBuilder: FormBuilder){}

  ngOnInit() {
    this.getBuildings();
    this.firstFormGroup = this._formBuilder.group({
      role: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', Validators.required],
      phoneNumber: ['', Validators.required]
    });
  }

  getBuildings(){
    this.roleService.getNonUserRoles().subscribe(roles => this.roles=roles);
  }

  createUser() {
    this.user.email=this.secondFormGroup.get("email")?.value;
    this.user.password=this.secondFormGroup.get("password")?.value;
    this.user.lastName=this.secondFormGroup.get("lastName")?.value;
    this.user.firstName=this.secondFormGroup.get("firstName")?.value;
    this.user.phoneNumber=this.secondFormGroup.get("phoneNumber")?.value;
    this.user.role=this.firstFormGroup.get("role")?.value;
    this.userService.createUser(this.user).pipe(
        catchError(error => {
          this._snackBar.open("Couldn't create the user!\n Reason: " + error.error.error,'Close',{duration:3000});
          return of();
        }),
        tap(result =>{
            this._snackBar.open("User created successfully!",'Close',{duration:3000});
        })).subscribe();
  }

}
