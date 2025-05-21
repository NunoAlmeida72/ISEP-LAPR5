import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, first } from 'rxjs';
import { Building } from 'src/app/Interfaces/building';
import { Floor } from 'src/app/Interfaces/floor';
import { BuildingService } from 'src/app/Services/building.service';
import { FloorService } from 'src/app/Services/floor.service';

@Component({
  selector: 'app-list-floors-with-elevator',
  templateUrl: './list-floors-with-elevator.component.html',
  styleUrls: ['./list-floors-with-elevator.component.css']
})
export class ListFloorsWithElevatorComponent {
  firstFormGroup!:FormGroup;
  isLinear=true;
  buildingId?:string;
  floors?:Floor[];
  buildings!:Building[];

  constructor(private buildingService:BuildingService,private floorService:FloorService,  private _formBuilder: FormBuilder){}

  ngOnInit() {
    this.getBuildings();
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: [null, Validators.required],
    });
  }

  getBuildings(){
    this.buildingService.getBuildings().subscribe(buildings => this.buildings=buildings);
  }

  getFloors(){
    this.buildingId=this.firstFormGroup.get("firstCtrl")?.value;
    if(!!this.buildingId === false){
      this.floors=undefined;
    }else{
      this.floorService.getFloorsWithElevator(this.buildingId).subscribe(floors => this.floors=floors);
    }
  }

  reset(){
    this.floors=undefined;
  }
}
