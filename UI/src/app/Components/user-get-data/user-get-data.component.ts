import { Component } from '@angular/core';
import  { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, of, tap } from 'rxjs';
import { User } from 'src/app/Interfaces/user';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-user-get-data',
  templateUrl: './user-get-data.component.html',
  styleUrls: ['./user-get-data.component.css']
})
export class UserGetDataComponent {
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
      fifthCtrl: []

    });
  }

}
