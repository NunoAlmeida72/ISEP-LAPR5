import { Component, OnInit } from '@angular/core';
import { Observable,of ,tap,catchError} from 'rxjs';
import { Robot } from 'src/app/Interfaces/robot';
import { RobotService } from 'src/app/Services/robot.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-disable-robot',
  templateUrl: './disable-robot.component.html',
  styleUrls: ['./disable-robot.component.css']
})
export class DisableRobotComponent implements OnInit {

  firstFormGroup!: FormGroup;

  isLinear=true;
  robot!:Robot;
  robots?:Robot[];

  constructor(private robotService:RobotService,private _snackBar:MatSnackBar,private _formBuilder: FormBuilder){}

  ngOnInit() {
    this.getRobots();
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
  }

  getRobots() {
    this.robotService.getRobots().subscribe(robots => this.robots=robots);
  }

  disableRobot(){
    this.robot=this.firstFormGroup.get("firstCtrl")?.value;
    if(!!this.robot.id == false){
      this._snackBar.open("You must select one robot",'Close',{duration:3000});
    } else {
      this.robot.code = undefined;
      this.robot.name = undefined;
      this.robot.number = undefined;
      this.robot.robotTypeId = undefined;
      this.robot.description = undefined;
      this.robot.status = undefined;
      this.robotService.disableRobot(this.robot).pipe(
        catchError(error => {
          this._snackBar.open("Couldn't disable the robot!\n Reason: " + error.error.error,'Close',{duration:3000});
          return of();
        }),
        tap(result =>{
            this._snackBar.open("Robot disabled successfully!",'Close',{duration:3000});
        })).subscribe();
    }
  }
}
