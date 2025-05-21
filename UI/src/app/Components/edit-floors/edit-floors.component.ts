import { Component, OnInit } from '@angular/core';
import { Observable,of,catchError,tap } from 'rxjs';
import { Building } from 'src/app/Interfaces/building';
import { BuildingService } from 'src/app/Services/building.service';
import { Floor } from 'src/app/Interfaces/floor';
import { FloorService } from 'src/app/Services/floor.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-floors',
  templateUrl: './edit-floors.component.html',
  styleUrls: ['./edit-floors.component.css']
})
export class EditFloorsComponent implements OnInit {

  floor!:Floor;
  buildingId?:string;
  floors?:Floor[];
  isLinear=true;
  buildings!:Building[];
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;

  constructor(private buildingService:BuildingService,private floorService:FloorService,private _formBuilder:FormBuilder,private _snackBar:MatSnackBar){
  }

  ngOnInit() {
    this.getBuildings();
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: [null, Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: [null, Validators.required],
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: [null, Validators.required],
      fourthCtrl: [null, Validators.required],
      fifthCtrl: [null, Validators.required],
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
      this.floorService.getFloors(this.buildingId).subscribe(floors => this.floors=floors);
    }
  }

  choosedFloor(){
    this.floor=this.secondFormGroup.get("secondCtrl")?.value;
    this.thirdFormGroup.get("secondCtrl")?.setValue(this.floor.number);
    this.thirdFormGroup.get("thirdCtrl")?.setValue(this.floor.description);
  }

  editFloor() {
    if(this.floor.buildingId!=this.thirdFormGroup.get("firstCtrl")?.value && this.floor.number!=this.thirdFormGroup.get("secondCtrl")?.value && this.floor.description!=this.thirdFormGroup.get("thirdCtrl")?.value){
      this.floorService.updateAllFloor(this.floor as Floor).pipe(
        catchError(error => {
        this._snackBar.open("Couldn't update the floor!\n Reason: " + error.error.error,'Close',{duration:3000});
        return of();
      }),
        tap(result =>{
          this._snackBar.open("Floor updated successfully!",'Close',{duration:3000});
      })).subscribe();
    }else{
      const floor1:Floor={};
      floor1.id=this.floor.id;
      if(this.floor.buildingId!=this.thirdFormGroup.get("firstCtrl")?.value && this.thirdFormGroup.get("firstCtrl")?.value!=null ){
        floor1.buildingId=this.thirdFormGroup.get("firstCtrl")?.value;
        console.log(this.thirdFormGroup.get("firstCtrl")?.value)
      }
      if(this.floor.number!=this.thirdFormGroup.get("secondCtrl")?.value){
        floor1.number=this.thirdFormGroup.get("secondCtrl")?.value;
      }
      if(this.floor.description!=this.thirdFormGroup.get("thirdCtrl")?.value){
        floor1.description=this.thirdFormGroup.get("thirdCtrl")?.value;
      }
      this.floorService.updateFloor(floor1 as Floor).pipe(catchError(error => {
        this._snackBar.open("Couldn't update the floor!\n Reason: " + error.error.error,'Close',{duration:3000});
        return of();
        }),
        tap(result =>{
            this._snackBar.open("Floor updated successfully!",'Close',{duration:3000});
        })).subscribe();
      }
      this.floors=undefined;
    }
}
