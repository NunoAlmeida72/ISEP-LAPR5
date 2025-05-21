import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { __values } from 'tslib';
import { catchError, of, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/Interfaces/user';
import { PrivacyPolicyComponent } from '../privacy-policy/privacy-policy.component';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent {
  firstFormGroup!: FormGroup;

  user: User = {};
  userRegistered: any|undefined;

  constructor(private authService: AuthService, private _snackBar: MatSnackBar, private _dialog: MatDialog, private _formBuilder: FormBuilder, private router: Router){};

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
      secondCtrl: ['', Validators.required],
      thirdCtrl: ['', Validators.required],
      fourthCtrl: ['', Validators.required],
      fifthCtrl: ['', Validators.required],
      sixthCtrl: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.firstFormGroup.valid) {
      // All form fields are filled, proceed to open the privacy policy
      this.openPrivacyPolicy();
    } else {
      // Display a message or take any action if the form is not valid
      this._snackBar.open("Please fill in all required fields!","Close",{duration:3000});
    }
  }
  

  openPrivacyPolicy() {
    const dialogRef = this._dialog.open(PrivacyPolicyComponent, {
      height: '800px',
      width: '1000px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.register();
      } else {
        console.log(result);
        this._snackBar.open("You can't register if you don't agree with the privacy policy!",undefined,{duration:3000});
      }
    })
  }

  async register() {
    this.user.firstName = this.firstFormGroup.get("firstCtrl")?.value;
    this.user.lastName = this.firstFormGroup.get("secondCtrl")?.value;
    this.user.email = this.firstFormGroup.get("thirdCtrl")?.value;
    this.user.phoneNumber = this.firstFormGroup.get("fourthCtrl")?.value;
    this.user.nif = this.firstFormGroup.get("fifthCtrl")?.value;
    this.user.password = this.firstFormGroup.get("sixthCtrl")?.value;
    this.userRegistered = await this.authService.signUp(this.user as User);
    if(this.userRegistered && this.userRegistered.userDTO){
      this._snackBar.open("User registered successfuly!",undefined,{duration:3000});
      this.router.navigate([""]);
    } else {
      this._snackBar.open("Couldn't regist the user!",undefined,{duration:3000});
    }
  }
}
