import { Component, OnInit } from '@angular/core';
import { Observable,of,catchError,tap } from 'rxjs';
import { Room } from 'src/app/Interfaces/room';
import { RoomService } from 'src/app/Services/room.service';
import { Floor } from 'src/app/Interfaces/floor';
import { FloorService } from 'src/app/Services/floor.service';
import { Building } from 'src/app/Interfaces/building';
import { BuildingService } from 'src/app/Services/building.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.css']
})
export class CreateRoomComponent implements OnInit {

  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;

  isLinear=true;

  floors!:Floor[];
  buildings!:Building[];
  room:Room = {};

  constructor(private buildingService:BuildingService,private floorService:FloorService, private roomService:RoomService,private _snackBar:MatSnackBar,private _formBuilder: FormBuilder){}

  ngOnInit() {
    this.getBuildings();
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required],
      fourthCtrl: ['', Validators.required],
      fifthCtrl: ['', Validators.required]
    })
  }
  
  getBuildings(){
    this.buildingService.getBuildings().subscribe(buildings => this.buildings=buildings);
  }

  getFloors() {
    this.floorService.getFloors(this.firstFormGroup.get("firstCtrl")?.value).subscribe(floors => this.floors=floors);
  }

  createRoom() {
    this.room.floorId=this.secondFormGroup.get("secondCtrl")?.value;
    this.room.name=this.thirdFormGroup.get("thirdCtrl")?.value;
    this.room.category=this.thirdFormGroup.get("fourthCtrl")?.value;
    this.room.description=this.thirdFormGroup.get("fifthCtrl")?.value;
    this.roomService.createRoom(this.room as Room).pipe(
      catchError(error => {
        this._snackBar.open("Couldn't create the room!\n Reason: " + error.error.error,'Close',{duration:3000});
        return of();
      }),
      tap(result =>{
        this._snackBar.open("Room created successfully!",'Close',{duration:3000});
      })).subscribe();
  }
}
