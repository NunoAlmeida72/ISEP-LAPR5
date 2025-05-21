import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import { User } from 'src/app/Interfaces/user';
import { AuthService } from 'src/app/Services/auth.service';
import { TaskRequestService } from 'src/app/Services/taskRequest.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user:User={}

  constructor(private userService:UserService,private authService:AuthService,private router:Router,private  _snackBar:MatSnackBar,private taskService:TaskRequestService){}

  ngOnInit(): void {
      this.userService.getMe().subscribe((user)=>{this.user=user});
  }

  deleteUser(){
    this.taskService.deleteByUser().subscribe();
    this.userService.deleteUser().pipe(
      catchError(error => {
        this._snackBar.open("Couldn't delete the account!\n Reason: " + error.error.error,'Close',{duration:3000});
        return of();
      }),
      tap(result =>{
          this.authService.logout();
          this._snackBar.open("User account deleted successfully!",'Close',{duration:3000});
      })).subscribe();
      this.router.navigate([""]);
  }

  editUser() {
    this.router.navigate(["edit-user"]);
  }

  userGetData() {
    this.router.navigate(["user-get-data"]);
  }
}
