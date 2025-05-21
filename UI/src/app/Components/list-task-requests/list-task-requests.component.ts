import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Robot } from 'src/app/Interfaces/robot';
import { RobotType } from 'src/app/Interfaces/robotType';
import { Room } from 'src/app/Interfaces/room';
import { TaskRequest } from 'src/app/Interfaces/taskRequest';
import { User } from 'src/app/Interfaces/user';
import { AuthService } from 'src/app/Services/auth.service';
import { RobotService } from 'src/app/Services/robot.service';
import { RobotTypeService } from 'src/app/Services/robotType.service';
import { RoomService } from 'src/app/Services/room.service';
import { TaskRequestService } from 'src/app/Services/taskRequest.service';
import { UserService } from 'src/app/Services/user.service';



@Component({
  selector: 'app-list-task-requests',
  templateUrl: './list-task-requests.component.html',
  styleUrls: ['./list-task-requests.component.css']
})
export class ListTaskRequestsComponent implements OnInit {


  taskRequests: TaskRequest[] = [];
  filteredTaskRequests: TaskRequest[] = [];
  filterOptions = { user: '', status: '', robotType: '' };
  robotTypes:RobotType[]=[];
  users:User[]=[];
  rooms:Room[]=[];
  robots:Robot[]=[];

  constructor(private taskRequestService: TaskRequestService,private robotTypeService:RobotTypeService,private userService:UserService,private roomService:RoomService,private robotService:RobotService) {}

  ngOnInit(): void {
    this.taskRequestService.getTaskRequests().subscribe((data) => {
      this.taskRequests = data;
      this.filteredTaskRequests = [...this.taskRequests];
    });

    this.robotTypeService.getRobotTypes().subscribe((data)=>{this.robotTypes=data});
    this.userService.getUsers().subscribe((data)=>this.users=data);
    this.roomService.listRooms().subscribe((data)=>{this.rooms=data});
    this.robotService.getRobots().subscribe((data)=>{this.robots=data})
  }

  applyFilters(): void {
    this.filteredTaskRequests = this.taskRequests.filter((task) => {
      return (
        (this.filterOptions.user === '' || task.userId === this.filterOptions.user) &&
        (this.filterOptions.status === '' || task.status === (this.filterOptions.status)) &&
        (this.filterOptions.robotType === '' || task.assignedTo === this.filterOptions.robotType)
      );
    });
  }

  mapUserIdToEmail(id:string):string|undefined{
    let user;
    for (let i = 0; i < this.users.length; i++) {
      if(this.users[i].id===id){
        user=this.users[i].email;
      }
    }
    return user;
  }

  applyRobotTypeFilters(){
    if(this.filterOptions.robotType===""){
      this.filteredTaskRequests=this.taskRequests;
    }else{
      this.taskRequestService.getTaskRequestsByRobotId(this.filterOptions.robotType).subscribe((data)=>{this.filteredTaskRequests=data});
    }
  }

  mapRoomIdToName(roomId?: string){
    let roomName;
    if(roomId){
      for(let i = 0; i < this.rooms.length; i++){
        if(roomId === this.rooms[i].id){
          let name = this.rooms[i].name;
          if (name != undefined) {
            roomName = name;
            return roomName;
          }
        }
      }
    }
    return roomName;
  }

  mapRobotToName(robot:string){
    let robotName
    if(robot){
      for (let i = 0; i < this.robots.length; i++) {
        if(this.robots[i].id===robot){
          robotName= this.robots[i].name;
          return robotName;
        }
        
      }
    }
    return "Task Not Assigned";
  }
}
