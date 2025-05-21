import { Component, OnInit } from '@angular/core';
import { Observable,of,catchError,tap } from 'rxjs';
import { Building } from 'src/app/Interfaces/building';
import { BuildingService } from 'src/app/Services/building.service';
import { Floor } from 'src/app/Interfaces/floor';
import { FloorService } from 'src/app/Services/floor.service';
import { BuildingConnection } from 'src/app/Interfaces/buildingconnection';
import { BuildingConnectionService } from 'src/app/Services/buildingconnection.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-building-connections',
  templateUrl: './edit-building-connections.component.html',
  styleUrls: ['./edit-building-connections.component.css']
})
export class EditBuildingConnectionsComponent implements OnInit {

  buildingconnection!:BuildingConnection;
  buildingconnections?:BuildingConnection[];
  buildingId1?:string;
  buildingId2?:string;
  floors1!:Floor[];
  floors2!:Floor[];
  floornumber?:number;
  isLinear=true;
  buildings!:Building[];
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;

  constructor(private buildingService:BuildingService,private floorService:FloorService, private buildingconnectionService:BuildingConnectionService,private _formBuilder:FormBuilder,private _snackBar:MatSnackBar){
  }

  ngOnInit() {
    this.getBuildings();
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: [null, Validators.required],
      secondCtrl: [null, Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      thirdCtrl: [null, Validators.required],
    });
    this.thirdFormGroup = this._formBuilder.group({
      firstCtrl: [null, Validators.required],
      secondCtrl: [null, Validators.required],
    });
  }

  getBuildings(){
    this.buildingService.getBuildings().subscribe(buildings => this.buildings=buildings);
  }

  getBuildingConnections(){
    this.buildingId1=this.firstFormGroup.get("firstCtrl")?.value;
    this.buildingId2=this.firstFormGroup.get("secondCtrl")?.value;
    if(!!this.buildingId1 === false || !!this.buildingId2 === false){
      this.buildingconnections=undefined;
    }else{
      this.buildingconnectionService.getBuildingConnections(this.buildingId1, this.buildingId2).subscribe(buildingconnections => this.buildingconnections=buildingconnections);
      this.floorService.getFloors(this.buildingId1).subscribe(floors => this.floors1=floors);
      this.floorService.getFloors(this.buildingId2).subscribe(floors => this.floors2=floors);
  }
}

  chosenBuildingConnection(){
    this.buildingconnection = this.secondFormGroup.get("thirdCtrl")?.value;
    this.thirdFormGroup.get("firstCtrl")?.setValue(this.buildingconnection.floor1Id);
    this.thirdFormGroup.get("secondCtrl")?.setValue(this.buildingconnection.floor2Id);
  }

  editBuildingConnection() {
    if(this.buildingconnection.floor1Id!=this.thirdFormGroup.get("firstCtrl")?.value && this.buildingconnection.floor2Id!=this.thirdFormGroup.get("secondCtrl")?.value){
      this.buildingconnection.floor1Id = this.thirdFormGroup.get("firstCtrl")?.value;
      this.buildingconnection.floor2Id = this.thirdFormGroup.get("secondCtrl")?.value;
      this.buildingconnectionService.updateAllBuildingConnection(this.buildingconnection as BuildingConnection).pipe(
        catchError(error => {
        this._snackBar.open("Couldn't update the building connection!\n Reason: " + error.error.error,'Close',{duration:3000});
        return of();
      }),
        tap(result =>{
          this._snackBar.open("Building connection updated successfully!",'Close',{duration:3000});
      })).subscribe();
    }else{
      const buildingconnection1:BuildingConnection={};
      buildingconnection1.id=this.buildingconnection.id;
      if(this.buildingconnection.floor1Id!=this.thirdFormGroup.get("firstCtrl")?.value && this.thirdFormGroup.get("firstCtrl")?.value!=null ){
        buildingconnection1.floor1Id=this.thirdFormGroup.get("firstCtrl")?.value;
      }
      if(this.buildingconnection.floor2Id!=this.thirdFormGroup.get("secondCtrl")?.value && this.thirdFormGroup.get("secondCtrl")?.value!=null ){
        buildingconnection1.floor2Id=this.thirdFormGroup.get("secondCtrl")?.value;
      }
      this.buildingconnectionService.updateBuildingConnection(buildingconnection1 as BuildingConnection).pipe(catchError(error => {
        this._snackBar.open("Couldn't update the building connection!\n Reason: " + error.error.error,'Close',{duration:3000});
        return of();
        }),
        tap(result =>{
            this._snackBar.open("Building connection updated successfully!",'Close',{duration:3000});
        })).subscribe();
      }
      this.buildingconnections=undefined;
    }


    mapFloorIdToNumber(floorId?: string){
      if(floorId){
        for(let i = 0; i < this.floors1.length; i++){
          if(floorId === this.floors1[i].id){
            let number = this.floors1[i].number;
            if (number != undefined) {
              this.floornumber = number;
          }
        }
      }
        for(let i = 0; i < this.floors2.length; i++){
          if(floorId === this.floors2[i].id){
             let number = this.floors2[i].number;
             if (number != undefined) {
             this.floornumber = number;
          }
        }
      }
    }
    return this.floornumber
  }

}
