import { Component, OnInit } from '@angular/core';
import { Observable, isEmpty,first,elementAt } from 'rxjs';
import { TaskRequest } from 'src/app/Interfaces/taskRequest';
import { TaskRequestService } from 'src/app/Services/taskRequest.service';
import { Task } from 'src/app/Interfaces/task';
import { TaskService } from 'src/app/Services/task.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/Services/user.service';
import { User } from 'src/app/Interfaces/user';
import { RoomService } from 'src/app/Services/room.service';
import { Room } from 'src/app/Interfaces/room';
import { Robot } from 'src/app/Interfaces/robot';
import { RobotService } from 'src/app/Services/robot.service';
import { RobotTypeService } from 'src/app/Services/robotType.service';
import { RobotType } from 'src/app/Interfaces/robotType';

@Component({
    selector: 'app-list-accept-or-refuse-requests',
    templateUrl: './list-accept-or-refuse-requests.component.html',
    styleUrls: ['./list-accept-or-refuse-requests.component.css']
})
export class ListAcceptOrRefuseRequestsComponent implements OnInit {

    firstFormGroup!:FormGroup;
    isLinear=true;

    taskRequests:TaskRequest[]=[];
    taskRequest?:TaskRequest;

    robotId:string="";

    task?:Task;
    taskTypes:Task[]=[];
    taskName?:string;

    rooms:Room[]=[];
    roomName?:string;

    users:User[]=[];
    userName?:string;

    robots:Robot[]=[];
    robotTypes:RobotType[]=[];

    constructor(private taskRequestService:TaskRequestService, private taskService:TaskService, private userService:UserService, private roomService:RoomService, private _formBuilder: FormBuilder, private _snackBar:MatSnackBar,private robotService:RobotService,private robotTypeService:RobotTypeService){}

    ngOnInit() {
      this.listUnapprovedTaskRequests();
    }

    listUnapprovedTaskRequests(){
      this.taskRequestService.listUnapprovedTaskRequests().subscribe(taskRequests => this.taskRequests=taskRequests);
      this.taskService.getTasks().subscribe(taskTypes => this.taskTypes=taskTypes);
      this.roomService.listRooms().subscribe(rooms => this.rooms=rooms);
      this.userService.getUsers().subscribe(users=>this.users=users);
      this.robotService.getRobots().subscribe(robots=>this.robots=robots);
      this.robotTypeService.getRobotTypes().subscribe(robotTypes=>this.robotTypes=robotTypes)

    }

    mapUserIdToEmail(id?: string):string|undefined{
      let user;
      for (let i = 0; i< this.users.length; i++) {
        if(this.users[i].id===id){
          user=this.users[i].email;
        }
      }
      return user;
    }

    mapTaskIdToName(taskId?: string){
      if(taskId){
        for(let i = 0; i < this.taskTypes.length; i++){
          if(taskId === this.taskTypes[i].id){
            let name = this.taskTypes[i].name;
            if (name != undefined) {
              this.taskName = name;
            }
          }
        }
      }
      return this.taskName
    }

    mapRoomIdToName(roomId?: string){
      if(roomId){
        for(let i = 0; i < this.rooms.length; i++){
          if(roomId === this.rooms[i].id){
            let name = this.rooms[i].name;
            if (name != undefined) {
              this.roomName = name;
            }
          }
        }
      }
      return this.roomName
    }

    updateStatus(id: string|undefined, status: boolean) {
      if (id) {
        var robotId: string | undefined = "";
        for (let i = 0; i < this.taskRequests.length; i++) {
          if (this.taskRequests[i].id == id) {
            if (this.taskRequests[i].assignedTo != undefined) {
              robotId = this.taskRequests[i].assignedTo;
              console.log(this.taskRequests[i].assignedTo);
            }
          }
        }
        if(status && robotId){
          this.taskRequestService.approveOrRefuseRequest(id, status,robotId).subscribe();
          this.taskRequests = this.taskRequests.filter(t => t.id !== id);
        }else if(!status){
          this.taskRequestService.approveOrRefuseRequest(id, status,"").subscribe();
          this.taskRequests = this.taskRequests.filter(t => t.id !== id);
        }else{
          this._snackBar.open("To approve a task request a robot must be selected!",'Close',{duration:3000});
        }
      }
    }

    getRobotsWithTask(task:string|undefined):Robot[]{
      let robotsWithTask:RobotType[]=[];
      if(task){
        this.robots.forEach(robot => {
          const robotType = robot.robotTypeId;
          
          // Encontrar o robot type correspondente
          const type = this.robotTypes.find(type => type.id === robotType);
      
          // Verificar se a tarefa desejada está na lista de tarefas do robot type
          if (type && type.possibleTasks?.includes(task)) {
            robotsWithTask.push(robot);
          }
        });
      }
      return robotsWithTask;
    }
}