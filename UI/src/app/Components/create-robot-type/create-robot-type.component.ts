import { Component, OnInit } from '@angular/core';
import { Observable,of ,tap,catchError} from 'rxjs';
import { RobotType } from 'src/app/Interfaces/robotType';
import { RobotTypeService } from 'src/app/Services/robotType.service';
import { Task } from 'src/app/Interfaces/task';
import { TaskService } from 'src/app/Services/task.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-robot-type',
  templateUrl: './create-robot-type.component.html',
  styleUrls: ['./create-robot-type.component.css']
})
export class CreateRobotTypeComponent implements OnInit {

  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  firstCtrl!: FormControl;
  isLinear=true;

  robotType:RobotType = {};
  tasks!:Task[];

  
  constructor(private robotTypeService:RobotTypeService,private taskService:TaskService,private _snackBar:MatSnackBar,private _formBuilder: FormBuilder){}
  ngOnInit() {
    this.getTasks();
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: new FormControl()
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
      thirdCtrl: ['', Validators.required],
      fourthCtrl: ['', Validators.required]
    });
  }
  
  getTasks(){
    this.taskService.getTasks().subscribe(tasks => this.tasks=tasks);
  }
  
  
  createRobotType() {
    this.robotType.possibleTasks = this.firstFormGroup.get("firstCtrl")?.value;
    this.robotType.type=this.secondFormGroup.get("secondCtrl")?.value;
    this.robotType.brand=this.secondFormGroup.get("thirdCtrl")?.value;
    this.robotType.model=this.secondFormGroup.get("fourthCtrl")?.value;
    if(typeof this.robotType.possibleTasks == 'undefined' || this.robotType.possibleTasks.length == 0){
      this._snackBar.open("You must select at least one task",'Close',{duration:3000});
    }else if(!!this.robotType.type === false){
      this._snackBar.open("You must write a type.",'Close',{duration:3000});
    }else if(!!this.robotType.brand === false){
      this._snackBar.open("You must write a brand.",'Close',{duration:3000});
    }else if(!!this.robotType.model === false){
      this._snackBar.open("You must write a model.",'Close',{duration:3000});
    }else{
        this.robotTypeService.createRobotType(this.robotType as RobotType).pipe(
        catchError(error => {
          this._snackBar.open("Couldn't create the robot type!\n Reason: " + error.error.error,'Close',{duration:3000});
          return of();
        }),
        tap(result =>{
            this._snackBar.open("Robot type created successfully!",'Close',{duration:3000});
        })).subscribe();
    }
  }

  
}
