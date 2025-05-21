import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, of, tap } from 'rxjs';
import { User } from 'src/app/Interfaces/user';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {
  firstFormGroup!: FormGroup;

  user: User = {};
  userOrNot: boolean = false;

  constructor(private userService: UserService, private _snackBar: MatSnackBar, private _formBuilder: FormBuilder)  {}

  ngOnInit() {
    this.userService.getMe().subscribe((user)=>{this.user=user;if(user.nif) {
      this.userOrNot = true;
    }});
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: [],
      secondCtrl: [],
      thirdCtrl: [],
      fourthCtrl: [],
      fifthCtrl: [],
    });
  }

  editUser() {
    const newUser: User = {
      id: this.user.id,
      email: this.user.email
    }
    if (this.firstFormGroup.get("firstCtrl")?.value != null) {
      newUser.firstName = this.firstFormGroup.get("firstCtrl")?.value;
    }
    if (this.firstFormGroup.get("secondCtrl")?.value != null) {
      newUser.lastName = this.firstFormGroup.get("secondCtrl")?.value;
    }
    if (this.firstFormGroup.get("thirdCtrl")?.value != null) {
      newUser.phoneNumber = this.firstFormGroup.get("thirdCtrl")?.value;
    }
    if (this.firstFormGroup.get("fourthCtrl")?.value != null) {
      newUser.nif = this.firstFormGroup.get("fourthCtrl")?.value;
    }
    if (this.firstFormGroup.get("fifthCtrl")?.value != null) {
      newUser.password = this.firstFormGroup.get("fifthCtrl")?.value;
    }
    if (newUser.firstName == undefined || newUser.lastName == undefined || newUser.phoneNumber == undefined || newUser.nif == undefined || newUser.password == undefined) {
      this.userService.editUser(newUser).pipe(
        catchError(error => {
        this._snackBar.open("Couldn't edit the user information!\n Reason: " + error.error.error,undefined,{duration:3000});
        return of();
      }),
        tap(result =>{
          this._snackBar.open("User information updated successfully!",undefined,{duration:3000});
      })).subscribe();
    } else {
      this.userService.editUserAll(newUser).pipe(
        catchError(error => {
        this._snackBar.open("Couldn't edit the user information!\n Reason: " + error.error.error,undefined,{duration:3000});
        return of();
      }),
        tap(result =>{
          this._snackBar.open("User information updated successfully!",undefined,{duration:3000});
      })).subscribe();
    }
  }
}
