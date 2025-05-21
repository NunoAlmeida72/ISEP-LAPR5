import { Component, OnInit } from '@angular/core';
import { Observable, isEmpty,first,elementAt } from 'rxjs';
import { Building } from 'src/app/Interfaces/building';
import { BuildingService } from 'src/app/Services/building.service';
import { BuildingConnection } from 'src/app/Interfaces/buildingconnection';
import { BuildingConnectionService } from 'src/app/Services/buildingconnection.service';
import { Floor } from 'src/app/Interfaces/floor';
import { FloorService } from 'src/app/Services/floor.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-list-building-connections',
    templateUrl: './list-building-connections.component.html',
    styleUrls: ['./list-building-connections.component.css']
})
export class ListBuildingConnectionsComponent implements OnInit {

    firstFormGroup!:FormGroup;
    isLinear=true;

    buildings!:Building[];
    buildingId1?:string;
    buildingId2?:string;
    floors1:Floor[]=[];
    floors2:Floor[]=[];
    buildingconnections?:BuildingConnection[];
    floornumber?:number;
  
    constructor(private buildingService:BuildingService,private buildingconnectionService:BuildingConnectionService,private floorService:FloorService, private _formBuilder: FormBuilder, private _snackBar:MatSnackBar){}

    ngOnInit() {
      this.getBuildings();
      this.firstFormGroup = this._formBuilder.group({
        firstCtrl: [null, Validators.required],
        secondCtrl: [null, Validators.required]
      });
    }

    getBuildings(){
      this.buildingService.getBuildings().subscribe(buildings => this.buildings=buildings);
    }
    
    getBuildingConnections(){
      this.buildingId1=this.firstFormGroup.get("firstCtrl")?.value;
      this.buildingId2=this.firstFormGroup.get("secondCtrl")?.value;
    if(this.buildingId1 === this.buildingId2){
      this._snackBar.open("You can't select the same building!",'Close',{duration:3000});
    }else if(!!this.buildingId1 === false || !!this.buildingId2 === false){
      this.buildingconnections=undefined;
    }else{
      this.buildingconnectionService.getBuildingConnections(this.buildingId1, this.buildingId2).subscribe(buildingconnections => this.buildingconnections=buildingconnections);
      this.floorService.getFloors(this.buildingId1).subscribe(floors => this.floors1=floors);
      this.floorService.getFloors(this.buildingId2).subscribe(floors => this.floors2=floors);
    }
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

    reset(){
      this.buildingconnections=undefined;
    }
}