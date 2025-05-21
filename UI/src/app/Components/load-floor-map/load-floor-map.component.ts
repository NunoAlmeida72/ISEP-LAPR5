import { Component, ElementRef, OnInit, ViewChild, booleanAttribute } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, catchError, first, of, tap } from 'rxjs';
import { Building } from 'src/app/Interfaces/building';
import { BuildingConnection } from 'src/app/Interfaces/buildingconnection';
import { Elevator } from 'src/app/Interfaces/elevator';
import { Floor } from 'src/app/Interfaces/floor';
import { Room } from 'src/app/Interfaces/room';
import { BuildingService } from 'src/app/Services/building.service';
import { BuildingConnectionService } from 'src/app/Services/buildingconnection.service';
import { ElevatorService } from 'src/app/Services/elevator.service';
import { FloorService } from 'src/app/Services/floor.service';
import { RoomService } from 'src/app/Services/room.service';

@Component({
  selector: 'app-load-floor-map',
  templateUrl: './load-floor-map.component.html',
  styleUrls: ['./load-floor-map.component.css']
})
export class LoadFloorMapComponent implements OnInit {

  isLinear=true;

  floor?:Floor;

  building?:Building;
  buildings?:Building[]

  floors?:Floor[];

  matrix!:number[][];

  elevators?:Elevator[];
  elevators1:Elevator[]=[];
  posXElevators!:number[];
  posYElevators!:number[];

  initialPosition:number[]=[0,0];
  initialDirection:number=0;

  buildingConnections?:BuildingConnection[];
  buildingConnections1:BuildingConnection[]=[];
  posXBcs!:number[];
  posYBcs!:number[];


  rooms?:Room[];
  rooms1:Room[]=[];
  posXRooms!:number[];
  posYRooms!:number[];
  widthRooms!:number[];
  heigthRooms!:number[];
  posXDoors!:number[];
  posYDoors!:number[];


  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;
  fourthFormGroup!: FormGroup
  fifthFormGroup!: FormGroup;
  sixthFormGroup!:FormGroup;
  seventhFormGroup!:FormGroup;
  eighthFormGroup!:FormGroup;
  ninthFormGroup!:FormGroup;

  json={};

  width!:number;
  depth!:number;
  valid=false;
  readyToLoad=false;
  @ViewChild('fileInput') fileInput: any;

  constructor(private buildingService:BuildingService,private floorService:FloorService,private elevatorService:ElevatorService,private bcService:BuildingConnectionService,private roomService:RoomService,private _formBuilder: FormBuilder,private _snackBar:MatSnackBar){
  }

  ngOnInit() {
    this.getBuildings();
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: [null, Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      firstCtrl: [null, Validators.required],
    });
    this.thirdFormGroup = this._formBuilder.group({
      firstCtrl: [null, Validators.required],
      secondCtrl: [null, Validators.required],
      thirdCtrl: [null, Validators.required],
    });
    this.fourthFormGroup = this._formBuilder.group({
      firstCtrl: [],
    });
    this.fifthFormGroup = this._formBuilder.group({
      firstCtrl: [null, Validators.required],
      secondCtrl: [null, Validators.required],
    });
    this.sixthFormGroup = this._formBuilder.group({
      firstCtrl: [],
    });
    this.seventhFormGroup = this._formBuilder.group({
      firstCtrl: [null, Validators.required],
      secondCtrl: [null, Validators.required],
    });
    this.eighthFormGroup = this._formBuilder.group({
      firstCtrl: [],
    });
    this.ninthFormGroup = this._formBuilder.group({
      firstCtrl: [null, Validators.required],
      secondCtrl: [null, Validators.required],
      thirdCtrl: [null, Validators.required],
      fourthCtrl: [null, Validators.required],
      fifthCtrl: [null, Validators.required],
      sixthCtrl: [null, Validators.required],
    });
  }

  readJsonFile(event: any): void {
    const file=event.target.files[0];
    const reader = new FileReader();
  
    reader.onload = (e) => {
      const content = e.target?.result as string;
  
      try {
        const json = JSON.parse(content);
        
        // Check if the 'matrix' property exists in the JSON
        if (json && json.matrix) {
          this.matrix = json.matrix;
        }
      } catch (error) {
        console.error('Error parsing JSON file:', error);
      }
    };
  
    reader.readAsText(file);
  }


  checkMatrix(){
      if(this.matrix){
        if(this.fileInput){
          this.fileInput.nativeElement.value = '';
        }
        const numRows = this.matrix.length;
        if (numRows != this.depth) {
          return;
        }
    
        const numCols = this.matrix[0].length;
        if (numCols != this.width) {
          return;
        }
        for (let i = 0; i < numRows; i++) {
          if (this.matrix[i].length !== numCols) {
            return;
          }
          for (let j = 0; j < numCols; j++) {
            const value = this.matrix[i][j];
            if (value > 9 || value < 0) {
              return;
            }
          }
        }
        this.valid=true;
      }
  }

  getBuildings(){
    this.buildingService.getBuildings().subscribe(buildings => (this.buildings=buildings));
  }

  getFloors(){
    this.building=this.firstFormGroup.get("firstCtrl")?.value;
    this.floorService.getFloors(this.building?.id).subscribe(floors => this.floors=floors);
    if(this.building?.width!=undefined && this.building?.depth!=undefined){
      this.width=this.building.width +1;
      this.depth=this.building.depth +1;
    }
  }

  getFloor(){
    this.floor=this.secondFormGroup.get("firstCtrl")?.value;
    this.elevatorService.getElevators(this.building?.id).subscribe(elevators=> this.elevators=elevators);
  }

  getElevators(){
    this.initialPosition[0]=this.thirdFormGroup.get("firstCtrl")?.value;
    this.initialPosition[1]=this.thirdFormGroup.get("secondCtrl")?.value;
    this.initialDirection=this.thirdFormGroup.get("thirdCtrl")?.value;
    if(this.elevators!=undefined && this.floor?.id!=undefined){
      let id=this.floor.id;
      let elevators1=this.elevators;
      for (let i = 0; i < elevators1.length; i++) {
        if(elevators1[i].floorsIds!=undefined && id!= undefined){
          if(!(elevators1[i].floorsIds?.includes(id))){
            this.elevators.splice(i,1);
          }
        }
      }
    }
  }

  getElevator(){
    this.elevators1=[];
    let valuesToAdd = this.fourthFormGroup.get("firstCtrl")?.value || [];
    this.elevators1.push(... valuesToAdd)
    this.posXElevators=new Array(this.elevators1.length).fill(0);
    this.posYElevators=new Array(this.elevators1.length).fill(0);
    if(valuesToAdd.length===0){
      this.bcService.getBuildingConnectionsByFloorId(this.floor?.id).subscribe(bcs => this.buildingConnections=bcs);
    }
  }

  getBuildingConnections(){
    this.bcService.getBuildingConnectionsByFloorId(this.floor?.id).subscribe(bcs => this.buildingConnections=bcs);
  }

  getBuildingConnection(){
    this.buildingConnections1=[];
    let valuesToAdd = this.sixthFormGroup.get("firstCtrl")?.value || [];
    this.buildingConnections1.push(... valuesToAdd);
    this.posXBcs=new Array(this.buildingConnections1.length).fill(0);
    this.posYBcs=new Array(this.buildingConnections1.length).fill(0);
    if(valuesToAdd.length===0){
      this.roomService.listRoomsByFloorId(this.floor?.id).subscribe(rooms=>this.rooms=rooms);
    }
  }

  getRooms(){
    this.roomService.listRoomsByFloorId(this.floor?.id).subscribe(rooms=>this.rooms=rooms);
  }

  getRoom(){
    this.rooms1=[];
    let valuesToAdd = this.eighthFormGroup.get("firstCtrl")?.value || [];
    this.rooms1.push(... valuesToAdd);
    this.posXRooms=new Array(this.buildingConnections1.length).fill(0);
    this.posYRooms=new Array(this.buildingConnections1.length).fill(0);
    this.widthRooms=new Array(this.buildingConnections1.length).fill(0);
    this.heigthRooms=new Array(this.buildingConnections1.length).fill(0);
    this.posXDoors=new Array(this.buildingConnections1.length).fill(0);
    this.posYDoors=new Array(this.buildingConnections1.length).fill(0);
  }

  loadJson(){
    let isValid=true;
    if(this.floor!=undefined){
      if(this.matrix!=undefined){
          if(isValid){
            let bcs=[];
            for (let i = 0; i < this.buildingConnections1.length; i++) {
              let json1={
                id:this.buildingConnections1[i].id,
                posX:this.posXBcs[i],
                posY:this.posYBcs[i]
              }
              bcs.push(json1);
            }

            let elevs=[];
            for (let i = 0; i < this.elevators1.length; i++) {
              let json1={
                id:this.elevators1[i].id,
                posX:this.posXElevators[i],
                posY:this.posYElevators[i]
              }
              elevs.push(json1);
            }

            let rs=[];
            for (let i = 0; i < this.rooms1.length; i++) {
              let json1={
                id:this.rooms1[i].id,
                posX:this.posXRooms[i],
                posY:this.posYRooms[i],
                width:this.widthRooms[i],
                height:this.heigthRooms[i],
                doorPosX: this.posXDoors[i],
                doorPosY: this.posYDoors[i]
              }
              rs.push(json1);
            }


            this.json={
              id:this.floor.id,
              map:this.matrix,
              initialPosition:this.initialPosition,
              initialDirection:this.initialDirection,
              rooms:rs,
              elevators:elevs,
              buildingConnections:bcs
            }
            this.readyToLoad=!this.readyToLoad;
          }
      }
    }

  }

  reset(){
    this.floorService.loadMap(this.json).pipe(catchError(error => {
      this._snackBar.open("Couldn't load floor map!\n Reason: " + error.error.error,'Close',{duration:3000});
      return of();
    }),
    tap(result =>{
        this._snackBar.open("Floor map loaded successfully!",'Close',{duration:3000});
    })).subscribe();
    this.readyToLoad=!this.readyToLoad
  }

}
