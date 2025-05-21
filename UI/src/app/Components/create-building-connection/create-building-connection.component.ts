import { Component, OnInit } from '@angular/core';
import { Observable,of,catchError,tap } from 'rxjs';
import { BuildingConnection } from 'src/app/Interfaces/buildingconnection';
import { BuildingConnectionService } from 'src/app/Services/buildingconnection.service';
import { Floor } from 'src/app/Interfaces/floor';
import { FloorService } from 'src/app/Services/floor.service';
import { Building } from 'src/app/Interfaces/building';
import { BuildingService } from 'src/app/Services/building.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-building-connection',
  templateUrl: './create-building-connection.component.html',
  styleUrls: ['./create-building-connection.component.css']
})
export class CreateBuildingConnectionComponent implements OnInit {

  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;

  isLinear=true;

  floors1!:Floor[];
  floors2!:Floor[];
  buildings!:Building[];
  buildingconnection:BuildingConnection = {};

  constructor(private buildingService:BuildingService,private floorService:FloorService, private buildingconnectionService:BuildingConnectionService,private _formBuilder:FormBuilder,private _snackBar:MatSnackBar){}

  ngOnInit() {
    this.getBuildings();
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
      secondCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required],
      fourthCtrl: ['', Validators.required]
    })
  }

  getBuildings(){
    this.buildingService.getBuildings().subscribe(buildings => this.buildings=buildings);
  }

  getFloors() {
    this.floorService.getFloors(this.firstFormGroup.get("firstCtrl")?.value).subscribe(floors => this.floors1=floors);
    this.floorService.getFloors(this.firstFormGroup.get("secondCtrl")?.value).subscribe(floors => this.floors2=floors);
  }

  createBuildingConnection(){
    this.buildingconnection.floor1Id = this.secondFormGroup.get("thirdCtrl")?.value;
    this.buildingconnection.floor2Id = this.secondFormGroup.get("fourthCtrl")?.value;
    this.buildingconnectionService.createBuildingConnection(this.buildingconnection as BuildingConnection).pipe(
      catchError(error => {
        this._snackBar.open("Couldn't create the building connection!\n Reason: " + error.error.error,'Close',{duration:3000});
        return of();
      }),
      tap(result =>{
        this._snackBar.open("Building Connection created successfully!",'Close',{duration:3000});
      })).subscribe();
  }
}
