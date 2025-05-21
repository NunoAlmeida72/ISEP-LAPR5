import { Component, OnInit } from '@angular/core';
import { Observable,of ,tap,catchError} from 'rxjs';
import { Robot } from 'src/app/Interfaces/robot';
import { TaskRequestsSequence } from 'src/app/Interfaces/task-requests-sequence';
import { RobotService } from 'src/app/Services/robot.service';
import { TaskRequest } from 'src/app/Interfaces/taskRequest';
import { TaskRequestService } from 'src/app/Services/taskRequest.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-list-task-execution',
  templateUrl: './list-task-execution.component.html',
  styleUrls: ['./list-task-execution.component.css']
})

export class ListTaskExecutionComponent implements OnInit {


  firstFormGroup!: FormGroup;

  isLinear=true;

  path:TaskRequestsSequence={"cost":"","sequence":""}

  algorithm?:string;
  taskRequests?:TaskRequest[];
  robots?:Robot[];
  robotId!:string;

  constructor(private robotService:RobotService,private taskRequestService:TaskRequestService,private _snackBar:MatSnackBar,private _formBuilder: FormBuilder){}

  ngOnInit() {
    this.getRobots();
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
      secondCtrl: ['', Validators.required]
    });
    
  }

  getTaskRequests(){
    this.robotId = this.firstFormGroup.get("firstCtrl")?.value;
    if(!!this.robotId === false){
      this._snackBar.open("You must choose a robot",'Close',{duration:3000});
    } else {
      this.taskRequestService.getApprovedTaskRequestsByRobot(this.robotId).subscribe(taskRequests => this.taskRequests=taskRequests);
    }
  }

  getRobots(){
    this.robotService.getRobots().subscribe(robots => this.robots=robots);
  }

  getSequence() {
    this.algorithm=this.firstFormGroup.get("secondCtrl")?.value;
    if (this.algorithm === 'BruteForce'){
      this.taskRequestService.getSequenceOfTaskRequests(this.robotId).subscribe((data)=>{this.path=data});
    } else {
      this.taskRequestService.getSequenceGenetic(this.robotId).subscribe((data)=>{this.path=data});
    }
  }

  reset(){
    this.robotId="";
    this.taskRequests=undefined;
    this.path={"cost":"","sequence":""}
  }
  
}
