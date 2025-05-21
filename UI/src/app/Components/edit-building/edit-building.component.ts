import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { of, catchError, tap } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Building } from "src/app/Interfaces/building";
import { BuildingService } from "src/app/Services/building.service";
import { BuildInvalidedProject } from 'typescript';

@Component({
    selector: 'app-edit-building',
    templateUrl: './edit-building.component.html',
    styleUrls: ['./edit-building.component.css']

})
export class EditBuildingComponent {

    building!:Building;
    buildings?:Building[];
    firstFormGroup!: FormGroup;
    secondFormGroup!: FormGroup;    
    isLinear = true;

    constructor(private buildingService:BuildingService, private _formBuilder:FormBuilder, private _snackBar:MatSnackBar) {}

    ngOnInit(){
        this.getBuildings();
        this.firstFormGroup = this._formBuilder.group({
            firstCtrl: [null, Validators.required],
        });
        this.secondFormGroup = this._formBuilder.group({
            secondCtrl: [null, Validators.required], //code
            thirdCtrl: [null, Validators.required], //name
            forthCtrl: [null, Validators.required], //description
            fifthCtrl: [null, Validators.required], //depth
            sixthCtrl: [null, Validators.required], //width
        })
        
    }

    getBuildings(){
        this.buildingService.getBuildings().subscribe(buildings => this.buildings=buildings);
    }

    chosenBuilding(){
        this.building=this.firstFormGroup.get("firstCtrl")?.value;
        this.secondFormGroup.get("secondCtrl")?.setValue(this.building.code);
        this.secondFormGroup.get("thirdCtrl")?.setValue(this.building.name);
        this.secondFormGroup.get("forthCtrl")?.setValue(this.building.description);
        this.secondFormGroup.get("fifthCtrl")?.setValue(this.building.depth);	
        this.secondFormGroup.get("sixthCtrl")?.setValue(this.building.width);

    }


    editBuilding(){
        if(this.building.code != this.secondFormGroup.get("secondCtrl")?.value &&  this.building.name != this.secondFormGroup.get("thirdCtrl")?.value && this.building.description != this.secondFormGroup.get("forthCtrl")?.value && this.building.depth != this.secondFormGroup.get("fifthCtrl")?.value && this.building.width != this.secondFormGroup.get("sixthCtrl")?.value){
            this.buildingService.updateAllBuilding(this.building as Building).pipe(
                catchError(error => {
                this._snackBar.open("Couldn't update the building!\n Reason: " + error.error.error,'Close',{duration:3000});
                return of();
                }),
                tap(result => {
                    this._snackBar.open("Building updated successfully!",'Close',{duration:3000});
                })).subscribe();

    } else {
        const building1:Building = {};
        building1.id = this.building.id;
        if(this.building.code != this.secondFormGroup.get("secondCtrl")?.value && this.secondFormGroup.get("secondCtrl")?.value != null){
            building1.code = this.secondFormGroup.get("secondCtrl")?.value;
        }
        if(this.building.name != this.secondFormGroup.get("thirdCtrl")?.value && this.secondFormGroup.get("thirdCtrl")?.value != null){
            building1.name = this.secondFormGroup.get("thirdCtrl")?.value;
        }
        if(this.building.description != this.secondFormGroup.get("forthCtrl")?.value && this.secondFormGroup.get("forthCtrl")?.value != null){
            building1.description = this.secondFormGroup.get("forthCtrl")?.value;
        }
        if(this.building.depth != this.secondFormGroup.get("fifthCtrl")?.value && this.secondFormGroup.get("fifthCtrl")?.value != null){
            building1.depth = this.secondFormGroup.get("fifthCtrl")?.value;
        }
        if(this.building.width != this.secondFormGroup.get("sixthCtrl")?.value && this.secondFormGroup.get("sixthCtrl")?.value != null){
            building1.width = this.secondFormGroup.get("sixthCtrl")?.value;
        }

        this.buildingService.updateBuilding(building1 as Building).pipe(
            catchError(error => {this._snackBar.open("Couldn't update the building!\n Reason: " + error.error.error,'Close',{duration:3000});
            return of();
            }),
            tap(result => {
                this._snackBar.open("Building updated successfully!",'Close',{duration:3000});
            })).subscribe();
        this.buildings = undefined;
    }

}
}
