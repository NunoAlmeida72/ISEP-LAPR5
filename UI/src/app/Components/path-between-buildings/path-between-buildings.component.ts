import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Building } from 'src/app/Interfaces/building';
import { Floor } from 'src/app/Interfaces/floor';
import { Path } from 'src/app/Interfaces/path';
import { Room } from 'src/app/Interfaces/room';
import { BuildingService } from 'src/app/Services/building.service';
import { FloorService } from 'src/app/Services/floor.service';
import { PathService } from 'src/app/Services/path.service';
import { RoomService } from 'src/app/Services/room.service';

@Component({
  selector: 'app-path-between-buildings',
  templateUrl: './path-between-buildings.component.html',
  styleUrls: ['./path-between-buildings.component.css']
})
export class PathBetweenBuildingsComponent implements OnInit {

  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;


  isLinear=true;

  buildings!:Building[];
  floors1!:Floor[];
  floors2!:Floor[];
  rooms1!:Room[];
  rooms2!:Room[];

  path:Path={result:""};

  constructor(private buildingService:BuildingService,private floorService:FloorService,private roomService:RoomService,private pathService:PathService,private _snackBar:MatSnackBar,private _formBuilder: FormBuilder){}

  ngOnInit() {
    this.getBuildings();
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: [' ', Validators.required],
      secondCtrl:['',Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
      secondCtrl:['',Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
      secondCtrl:['',Validators.required]
    });
  }

  getBuildings(){
    this.buildingService.getBuildings().subscribe(buildings => this.buildings=buildings);
  }

  getFloors(){
    let buildingId1;
    let buildingId2;
    buildingId1=this.firstFormGroup.get("firstCtrl")?.value;
    buildingId2=this.firstFormGroup.get("secondCtrl")?.value;
    this.floorService.getFloors(buildingId1).subscribe(floors => this.floors1=floors);
    this.floorService.getFloors(buildingId2).subscribe(floors => this.floors2=floors);
  }

  getRooms(){
    let floorId1;
    let floorId2;
    floorId1=this.secondFormGroup.get("firstCtrl")?.value;
    floorId2=this.secondFormGroup.get("secondCtrl")?.value;
    this.roomService.listRoomsByFloorId(floorId1).subscribe(rooms => this.rooms1=rooms);
    this.roomService.listRoomsByFloorId(floorId2).subscribe(rooms => this.rooms2=rooms);
  }

  getPath(){
    let id1=this.thirdFormGroup.get("firstCtrl")?.value;
    let id2=this.thirdFormGroup.get("secondCtrl")?.value;

    this.pathService.getPathBetween2Rooms(id1,id2).subscribe(path => this.path=path);
  }

  reset(){
    this.floors1=[];
    this.floors2=[];
    this.path={result:""};
  }

}
