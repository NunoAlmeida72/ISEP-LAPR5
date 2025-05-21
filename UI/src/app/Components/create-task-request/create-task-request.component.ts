import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, of, tap } from 'rxjs';
import { Building } from 'src/app/Interfaces/building';
import { Floor } from 'src/app/Interfaces/floor';
import { Room } from 'src/app/Interfaces/room';
import { Task } from 'src/app/Interfaces/task';
import { TaskRequest } from 'src/app/Interfaces/taskRequest';
import { BuildingService } from 'src/app/Services/building.service';
import { FloorService } from 'src/app/Services/floor.service';
import { RoomService } from 'src/app/Services/room.service';
import { TaskService } from 'src/app/Services/task.service';
import { TaskRequestService } from 'src/app/Services/taskRequest.service';

@Component({
  selector: 'app-create-task-request',
  templateUrl: './create-task-request.component.html',
  styleUrls: ['./create-task-request.component.css']
})
export class CreateTaskRequestComponent {

  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;
  fourthFormGroup!: FormGroup;
  fifthFormGroup!: FormGroup;
  isLinear=true;

  taskRequest: TaskRequest = {};
  tasks!: Task[];
  rooms!: Room[];
  floors:Floor[]=[];
  buildings:Building[]=[];

  surveillance=false;

  constructor(private taskrequestService: TaskRequestService, private taskService: TaskService, private roomService: RoomService, private _formBuilder: FormBuilder, private _snackBar: MatSnackBar,private floorService:FloorService,private buildingService:BuildingService) { }


  
  ngOnInit(): void {
    this.getTasks();
    this.getRooms();
    this.buildingService.getBuildings().subscribe((data)=>this.buildings=data);
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['',Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      buildingId: ['',Validators.required],
    });
    this.thirdFormGroup = this._formBuilder.group({
      floorId: ['',Validators.required],
    });
    this.fourthFormGroup = this._formBuilder.group({
      room1: ['',Validators.required],
      room2: ['',Validators.required]
    });
    this.fifthFormGroup = this._formBuilder.group({
      name: ['',Validators.required],
    });
  }

  getTasks() {
    this.taskService.getTasks().subscribe(tasks => this.tasks = tasks);
  }

  getRooms() {
    this.roomService.listRooms().subscribe(rooms => this.rooms = rooms);
  }


  taskRequestOption(){
    let id=this.firstFormGroup.get("firstCtrl")?.value;
    this.taskRequest.taskId=id;
    for (let i = 0; i < this.tasks.length; i++) {
      if(this.tasks[i].id===id && this.tasks[i].name==="Surveillance"){
        this.surveillance=true;
      }else{
        this.surveillance=false;
      }
    }
  }

  getFloors(){
    let id=this.secondFormGroup.get("buildingId")?.value;
    this.floorService.getFloors(id).subscribe((data)=>this.floors=data)
  }

  createTaskRequest() {
    if(this.surveillance){
      let floorId=this.thirdFormGroup.get("floorId")?.value;
      let tasks=this.rooms.filter(task => task.floorId===floorId);
      this.taskRequest.name=this.fifthFormGroup.get("name")?.value;
      this.taskRequest.startingPoint=tasks[0].id;
      this.taskRequest.endingPoint=tasks[tasks.length - 1].id;
      this.taskrequestService.createTaskRequest(this.taskRequest as TaskRequest).pipe(
        catchError(error => {
          this._snackBar.open("Couldn't create the task request!\n Reason: " + error.error.error, 'Close', { duration: 3000 });
          return of();
        }),
        tap(result => {
          this._snackBar.open("Task request created successfully!", 'Close', { duration: 3000 });
        })).subscribe();
    }else{
      this.taskRequest.startingPoint = this.fourthFormGroup.get("room1")?.value;
      this.taskRequest.endingPoint = this.fourthFormGroup.get("room2")?.value;
      this.taskRequest.name=this.fifthFormGroup.get("name")?.value;
      this.taskrequestService.createTaskRequest(this.taskRequest as TaskRequest).pipe(
        catchError(error => {
          this._snackBar.open("Couldn't create the task request!\n Reason: " + error.error.error, 'Close', { duration: 3000 });
          return of();
        }),
        tap(result => {
          this._snackBar.open("Task request created successfully!", 'Close', { duration: 3000 });
        })).subscribe();
    }
    this.taskRequest={};
    this.surveillance=false;
  }
}
