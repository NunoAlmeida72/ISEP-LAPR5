import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Building } from 'src/app/Interfaces/building';
import { Elevator } from 'src/app/Interfaces/elevator';
import { Floor } from 'src/app/Interfaces/floor';
import { BuildingService } from 'src/app/Services/building.service';
import { ElevatorService } from 'src/app/Services/elevator.service';
import { FloorService } from 'src/app/Services/floor.service';

@Component({
  selector: 'app-list-elevator',
  templateUrl: './list-elevator.component.html',
  styleUrls: ['./list-elevator.component.css']
})
export class ListElevatorComponent {
  firstFormGroup!:FormGroup;
  isLinear=true;
  buildingId?:string;
  elevators?:Elevator[];
  buildings!:Building[];
  floors:Floor[]=[];
  floorsNumbers:number[]=[];

  constructor(private buildingService:BuildingService,private floorService:FloorService,private elevatorService:ElevatorService,private _formBuilder:FormBuilder){}

  ngOnInit() {
    this.getBuildings();
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: [null, Validators.required],
    });
  }

  getBuildings(){
    this.buildingService.getBuildings().subscribe(buildings => this.buildings=buildings);
  }

  getElevators(){
    this.buildingId=this.firstFormGroup.get("firstCtrl")?.value;
    if(!!this.buildingId === false){
      this.elevators=undefined;
    }else{
      this.elevatorService.getElevators(this.buildingId).subscribe(elevators => this.elevators=elevators);
      this.floorService.getFloors(this.buildingId).subscribe(floors => this.floors=floors);
    }
  }

  mapFloorIdsToNumbers(floorsIds?: string[]) {
    this.floorsNumbers = [];
    if (floorsIds) {
      for (let i = 0; i < floorsIds.length; i++) {
        for (let j = 0; j < this.floors.length; j++) {
          if (floorsIds[i] === this.floors[j].id) {
            let number = this.floors[j].number;
            if (number != undefined) {
              this.floorsNumbers.push(number);
            }
          }
        }
      }
    }
    return this.floorsNumbers
  }

  reset(){
    this.elevators=undefined;
  }
}
