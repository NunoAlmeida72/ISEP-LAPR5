import { Component } from '@angular/core';
import { Building } from 'src/app/Interfaces/building';
import { BuildingService } from 'src/app/Services/building.service';
import { Floor } from 'src/app/Interfaces/floor';
import { FloorService } from 'src/app/Services/floor.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-list-buildings-by-min-max-number-of-floors',
  templateUrl: './list-buildings-by-min-max-number-of-floors.component.html',
  styleUrls: ['./list-buildings-by-min-max-number-of-floors.component.css']
})
export class ListBuildingsByMinMaxNumberOfFloorsComponent {

  firstFormGroup!:FormGroup;
  isLinear=true;
  buildings!:Building[];

  minFloors:number = 0;
  maxFloors:number = 6;

  constructor(private buildingService:BuildingService,private _formBuilder: FormBuilder, private _snackBar:MatSnackBar){
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
      secondCtrl: ['', Validators.required],
    });
  }

  getBuildingsByMinMaxFloors(){
    this.minFloors=this.firstFormGroup.get("firstCtrl")?.value;
    this.maxFloors=this.firstFormGroup.get("secondCtrl")?.value;
    
    this.buildingService.getBuildingByMinMaxFloors(this.minFloors,this.maxFloors).subscribe(buildings => this.buildings=buildings);

  }  
  

}
