import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable, of, tap, catchError } from "rxjs";
import { Building } from "src/app/Interfaces/building";
import { BuildingService } from "src/app/Services/building.service";

@Component({
    selector: 'app-create-building',
    templateUrl: './create-building.component.html',
    styleUrls: ['./create-building.component.css']
})
export class CreateBuildingComponent {
    
    firstFormGroup!: FormGroup;
    isLinear=true;


    building:Building ={};

    constructor(private buildingService:BuildingService, private _snackBar:MatSnackBar, private _formBuilder:FormBuilder){}

    ngOnInit(){
        this.firstFormGroup = this._formBuilder.group({
            firstCtrl: ['', Validators.required],
            secondCtrl: ['', Validators.required],
            thirdCtrl: ['', Validators.required],
            forthCtrl: ['', Validators.required],
            fifthCtrl: ['', Validators.required],
        });
    }

    createBuilding() {
        this.building.code=this.firstFormGroup.get("firstCtrl")?.value;
        this.building.name=this.firstFormGroup.get("secondCtrl")?.value;
        this.building.description=this.firstFormGroup.get("thirdCtrl")?.value;
        this.building.width=this.firstFormGroup.get("forthCtrl")?.value;
        this.building.depth=this.firstFormGroup.get("fifthCtrl")?.value;

        this.buildingService.createBuilding(this.building as Building).pipe(
            catchError(error => {
                this._snackBar.open("Couldn't create the building!\n Reason: " + error.error.error,'Close',{duration:3000});
                return of();
              }),
              tap(result =>{
                  this._snackBar.open("Building created successfully!",'Close',{duration:3000});
              })).subscribe();
        

    }

}