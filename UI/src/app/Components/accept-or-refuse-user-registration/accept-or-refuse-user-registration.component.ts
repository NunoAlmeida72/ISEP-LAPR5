import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, of, tap } from 'rxjs';
import { User } from 'src/app/Interfaces/user';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-accept-or-refuse-user-registration',
  templateUrl: './accept-or-refuse-user-registration.component.html',
  styleUrls: ['./accept-or-refuse-user-registration.component.css']
})
export class AcceptOrRefuseUserRegistrationComponent implements OnInit {

  users:User[]=[];

  constructor(private userService:UserService,private _snackBar:MatSnackBar){}

  ngOnInit(){
    this.userService.getUserRequests().subscribe((data)=>{this.users=data});
  }

  accept(id:string){
    if(id){
      this.userService.acceptUser(id).pipe(
        catchError(error => {
          this._snackBar.open("Couldn't approve the user!\n Reason: " + error.error.error,'Close',{duration:3000});
          return of();
        }),
        tap(result =>{
            this.users = this.users.filter(t => t.id !== id);
            this._snackBar.open("User approved successfully!",'Close',{duration:3000});
        })).subscribe();
    }
  }

  reject(id:string){
    if(id){
      this.userService.rejectUser(id).pipe(
        catchError(error => {
          this._snackBar.open("Couldn't approve the user!\n Reason: " + error.error.error,'Close',{duration:3000});
          return of();
        }),
        tap(result =>{
            this.users = this.users.filter(t => t.id !== id);
            this._snackBar.open("User rejected successfully!",'Close',{duration:3000});
        })).subscribe();
    }
  }

}
