import { Component, OnInit } from '@angular/core';
import { Observable,of ,tap,catchError} from 'rxjs';
import { Robot } from 'src/app/Interfaces/robot';
import { RobotService } from 'src/app/Services/robot.service';
import { Task } from 'src/app/Interfaces/task';
import { TaskService } from 'src/app/Services/task.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-list-robots-task-designation',
  templateUrl: './list-robots-task-designation.component.html',
  styleUrls: ['./list-robots-task-designation.component.css']
})
export class ListRobotsTaskDesignationComponent implements OnInit {


  firstFormGroup!: FormGroup;


  isLinear=true;

  task!:string;
  designation!:string;
  tasks!:Task[];
  names!:string[];
  robots?:Robot[];

  constructor(private robotService:RobotService,private taskService:TaskService,private _snackBar:MatSnackBar,private _formBuilder: FormBuilder){}

  ngOnInit() {
    this.getTasks();
    this.getNames();
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
      secondCtrl: ['', Validators.required],
    });
  }

  getTasks(){
    this.taskService.getTasks().subscribe(tasks => this.tasks=tasks);
  }

  getNames(){
    this.robotService.getNames().subscribe(names => this.names=names);
  }

  getRobots() {
    this.task=this.firstFormGroup.get("firstCtrl")?.value;
    this.designation=this.firstFormGroup.get("secondCtrl")?.value;
    if(!!this.task == false || !!this.designation == false){
      this._snackBar.open("You must choose a task or designation.",'Close',{duration:3000});
    } else if(this.task == "None" && this.designation == "None"){
      this._snackBar.open("You must choose a task or designation.",'Close',{duration:3000});
    } else if(this.task != "None" && this.designation == "None"){
      this.robotService.getRobotsByTaskOrDesignation(this.task).subscribe(robots => this.robots=robots);
    } else if(this.task == "None" && this.designation != "None"){
      this.robotService.getRobotsByTaskOrDesignation(this.designation).subscribe(robots => this.robots=robots);
    } else {
      this._snackBar.open("You must choose a task or designation.",'Close',{duration:3000});
    }
  }
  reset(){
    this.robots=undefined;
  }
  
}
