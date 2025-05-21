import { Component, OnInit } from '@angular/core';
import { Observable,of ,tap,catchError} from 'rxjs';
import { RobotType } from 'src/app/Interfaces/robotType';
import { RobotTypeService } from 'src/app/Services/robotType.service';
import { Robot } from 'src/app/Interfaces/robot';
import { RobotService } from 'src/app/Services/robot.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-robot',
  templateUrl: './create-robot.component.html',
  styleUrls: ['./create-robot.component.css']
})
export class CreateRobotComponent implements OnInit {

  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;

  isLinear=true;

  robot:Robot = {};

  robotTypes!:RobotType[];

  

  constructor(private robotTypeService:RobotTypeService,private robotService:RobotService,private _snackBar:MatSnackBar,private _formBuilder: FormBuilder){}

  ngOnInit() {
    this.getRobotTypes();
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
      thirdCtrl: ['', Validators.required],
      fourthCtrl: ['', Validators.required],
      fifthCtrl: ['', Validators.required]
    });
  }

  getRobotTypes(){
    this.robotTypeService.getRobotTypes().subscribe(robotTypes => this.robotTypes=robotTypes);
  }

  createRobot() {
    this.robot.robotTypeId=this.firstFormGroup.get("firstCtrl")?.value;
    this.robot.code=this.secondFormGroup.get("secondCtrl")?.value;
    this.robot.name=this.secondFormGroup.get("thirdCtrl")?.value;
    this.robot.number=this.secondFormGroup.get("fourthCtrl")?.value;
    this.robot.description=this.secondFormGroup.get("fifthCtrl")?.value;
    if(!!this.robot.robotTypeId === false){
      this._snackBar.open("You must select one robot Type",'Close',{duration:3000});
    }else if(!!this.robot.code === false){
        this._snackBar.open("You must write a code.",'Close',{duration:3000});
    }else if(!!this.robot.name === false){
        this._snackBar.open("You must write a name.",'Close',{duration:3000});
    }else if(!!this.robot.description === false){
      this._snackBar.open("You must write a description.",'Close',{duration:3000});
    }else{
        this.robotService.createRobot(this.robot as Robot).pipe(
        catchError(error => {
          this._snackBar.open("Couldn't create the robot!\n Reason: " + error.error.error,'Close',{duration:3000});
          return of();
        }),
        tap(result =>{
            this._snackBar.open("Robot created successfully!",'Close',{duration:3000});
        })).subscribe();
    }
  }

  
}
