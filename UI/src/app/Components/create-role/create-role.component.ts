import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, of, tap } from 'rxjs';
import { Role } from 'src/app/Interfaces/role';
import { RoleService } from 'src/app/Services/role.service';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.css']
})
export class CreateRoleComponent {

    firstFormGroup!: FormGroup;
    isLinear=true;


    role:Role ={};

    constructor(private roleService:RoleService, private _snackBar:MatSnackBar, private _formBuilder:FormBuilder){}

    ngOnInit(){
        this.firstFormGroup = this._formBuilder.group({
            name: ['', Validators.required],
        });
    }

    createRole() {
      this.role.name=this.firstFormGroup.get("name")?.value;

      this.roleService.createRole(this.role as Role).pipe(
          catchError(error => {
              this._snackBar.open("Couldn't create the role!\n Reason: " + error.error.error,'Close',{duration:3000});
              return of();
            }),
            tap(result =>{
                this._snackBar.open("Role created successfully!",'Close',{duration:3000});
            })).subscribe();
      

  }
}
