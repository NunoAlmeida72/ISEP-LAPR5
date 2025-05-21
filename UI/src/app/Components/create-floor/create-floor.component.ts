import { Component, OnInit } from '@angular/core';
import { Observable,of ,tap,catchError} from 'rxjs';
import { Building } from 'src/app/Interfaces/building';
import { BuildingService } from 'src/app/Services/building.service';
import { Floor } from 'src/app/Interfaces/floor';
import { FloorService } from 'src/app/Services/floor.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-floor',
  templateUrl: './create-floor.component.html',
  styleUrls: ['./create-floor.component.css']
})
export class CreateFloorComponent implements OnInit {

  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;

  isLinear=true;

  floor:Floor ={};

  buildings!:Building[];

  

  constructor(private buildingService:BuildingService,private floorService:FloorService,private _snackBar:MatSnackBar,private _formBuilder: FormBuilder){}

  ngOnInit() {
    this.getBuildings();
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: [' ', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
      thirdCtrl: ['', Validators.required]
    });
  }

  getBuildings(){
    this.buildingService.getBuildings().subscribe(buildings => this.buildings=buildings);
  }

  createFloor() {
    this.floor.buildingId=this.firstFormGroup.get("firstCtrl")?.value;
    this.floor.number=this.secondFormGroup.get("secondCtrl")?.value;
    this.floor.description=this.secondFormGroup.get("thirdCtrl")?.value;
    this.floorService.createFloor(this.floor as Floor).pipe(
        catchError(error => {
          this._snackBar.open("Couldn't create the floor!\n Reason: " + error.error.error,'Close',{duration:3000});
          return of();
        }),
        tap(result =>{
            this._snackBar.open("Floor created successfully!",'Close',{duration:3000});
        })).subscribe();
  }

  
}
