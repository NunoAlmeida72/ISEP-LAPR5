import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, of, tap } from 'rxjs';
import { Building } from 'src/app/Interfaces/building';
import { Elevator } from 'src/app/Interfaces/elevator';
import { Floor } from 'src/app/Interfaces/floor';
import { BuildingService } from 'src/app/Services/building.service';
import { ElevatorService } from 'src/app/Services/elevator.service';
import { FloorService } from 'src/app/Services/floor.service';

@Component({
  selector: 'app-edit-elevator',
  templateUrl: './edit-elevator.component.html',
  styleUrls: ['./edit-elevator.component.css']
})
export class EditElevatorComponent {
  elevator!:Elevator;
  buildingId?:string;
  floors!:Floor[];
  elevators?:Elevator[];
  isLinear=true;
  buildings!:Building[];
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;

  constructor(private buildingService:BuildingService,private floorService:FloorService,private elevatorService:ElevatorService,private _formBuilder:FormBuilder,private _snackBar:MatSnackBar){}

  ngOnInit() {
    this.getBuildings();
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: [null, Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: [null, Validators.required],
    });
    this.thirdFormGroup = this._formBuilder.group({
      firstCtrl: [null, Validators.required],
      secondCtrl: [null, Validators.required],
      thirdCtrl: [null, Validators.required],
      fourthCtrl: [null, Validators.required],
      fifthCtrl: [null, Validators.required],
      sixthCtrl: [null, Validators.required],
      seventhCtrl: [null, Validators.required],
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
    }
  }

  choosedElevator(){
    this.elevator=this.secondFormGroup.get("secondCtrl")?.value;
    this.getFloors();
    this.thirdFormGroup.get("secondCtrl")?.setValue(this.elevator.floorsIds);
    this.thirdFormGroup.get("thirdCtrl")?.setValue(this.elevator.code);
    this.thirdFormGroup.get("fourthCtrl")?.setValue(this.elevator.brand);
    this.thirdFormGroup.get("fifthCtrl")?.setValue(this.elevator.model);
    this.thirdFormGroup.get("sixthCtrl")?.setValue(this.elevator.serialNumber);
    this.thirdFormGroup.get("seventhCtrl")?.setValue(this.elevator.description);
  }

  getFloors() {
    this.floorService.getFloors(this.buildingId).subscribe(floors => this.floors=floors);
  }

  editFloor() {
    if(this.elevator.buildingId!=this.thirdFormGroup.get("firstCtrl")?.value && this.elevator.floorsIds!=this.thirdFormGroup.get("secondCtrl")?.value && this.elevator.code!=this.thirdFormGroup.get("thirdCtrl")?.value && this.elevator.brand!=this.thirdFormGroup.get("fourthCtrl")?.value && this.elevator.model!=this.thirdFormGroup.get("fifthCtrl")?.value && this.elevator.serialNumber!=this.thirdFormGroup.get("sixthCtrl")?.value && this.elevator.description!=this.thirdFormGroup.get("seventhdCtrl")?.value){
      this.elevatorService.updateAllElevator(this.elevator as Elevator).pipe(
        catchError(error => {
        this._snackBar.open("Couldn't update the elevator!\n Reason: " + error.error.error,'Close',{duration:3000});
        return of();
      }),
        tap(result =>{
          this._snackBar.open("Elevator updated successfully!",'Close',{duration:3000});
      })).subscribe();
    }else{
      const elevator1:Elevator={};
      elevator1.id=this.elevator.id;
      if(this.elevator.buildingId!=this.thirdFormGroup.get("firstCtrl")?.value && this.thirdFormGroup.get("firstCtrl")?.value!=null ){
        elevator1.buildingId=this.thirdFormGroup.get("firstCtrl")?.value;
      }
      console.log(this.thirdFormGroup.get("secondCtrl")?.value);
      if (this.elevator.floorsIds!=this.thirdFormGroup.get("secondCtrl")?.value && this.thirdFormGroup.get("secondCtrl")?.value!=null) {
        elevator1.floorsIds=this.thirdFormGroup.get("secondCtrl")?.value;
      }
      if(this.elevator.code!=this.thirdFormGroup.get("thirdCtrl")?.value){
        elevator1.code=this.thirdFormGroup.get("thirdCtrl")?.value;
      }
      if(this.elevator.brand!=this.thirdFormGroup.get("fourthCtrl")?.value){
        elevator1.brand=this.thirdFormGroup.get("fourthCtrl")?.value;
      }
      if(this.elevator.model!=this.thirdFormGroup.get("fifthCtrl")?.value){
        elevator1.model=this.thirdFormGroup.get("fifthCtrl")?.value;
      }
      if(this.elevator.serialNumber!=this.thirdFormGroup.get("sixthCtrl")?.value){
        elevator1.serialNumber=this.thirdFormGroup.get("sixthCtrl")?.value;
      }
      if(this.elevator.description!=this.thirdFormGroup.get("seventhCtrl")?.value){
        elevator1.description=this.thirdFormGroup.get("seventhCtrl")?.value;
      }
      this.elevatorService.updateElevator(elevator1 as Elevator).pipe(catchError(error => {
        this._snackBar.open("Couldn't update the elevator!\n Reason: " + error.error.error,'Close',{duration:3000});
        return of();
        }),
        tap(result =>{
            this._snackBar.open("Elevator updated successfully!",'Close',{duration:3000});
      })).subscribe();
    }
    this.elevators=undefined;
  }
}
