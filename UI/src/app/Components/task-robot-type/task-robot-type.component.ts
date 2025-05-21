import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, of, tap } from 'rxjs';
import { RobotTypeTask } from 'src/app/Interfaces/robot-type-task';
import { RobotTypeService } from 'src/app/Services/robotType.service';

@Component({
  selector: 'app-task-robot-type',
  templateUrl: './task-robot-type.component.html',
  styleUrls: ['./task-robot-type.component.css']
})
export class TaskRobotTypeComponent {

  firstFormGroup!: FormGroup;
  isLinear=true;


  task:RobotTypeTask ={};

  constructor(private robotTypeService:RobotTypeService, private _snackBar:MatSnackBar, private _formBuilder:FormBuilder){}

  ngOnInit(){
      this.firstFormGroup = this._formBuilder.group({
          firstCtrl: ['', Validators.required],
      });
  }

  createTask() {
      this.task.name=this.firstFormGroup.get("firstCtrl")?.value;

      this.robotTypeService.createTask(this.task as RobotTypeTask).pipe(
          catchError(error => {
              this._snackBar.open("Couldn't create the task!\n Reason: " + error.error.error,'Close',{duration:3000});
              return of();
            }),
            tap(result =>{
                this._snackBar.open("Task created successfully!",'Close',{duration:3000});
            })).subscribe();
      

  }
}
