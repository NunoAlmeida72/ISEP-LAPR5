import { Component } from '@angular/core';
import { Observable, first } from 'rxjs';
import { Building } from 'src/app/Interfaces/building';
import { BuildingService } from 'src/app/Services/building.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-list-buildings',
  templateUrl: './list-buildings.component.html',
  styleUrls: ['./list-buildings.component.css']
})
export class ListBuildingsComponent {

  firstFormGroup!:FormGroup;
  isLinear=true;
  buildings!:Building[];

  constructor(private buildingService:BuildingService){}

  ngOnInit() {
    this.getBuildings();
  }

  getBuildings(){
    this.buildingService.getBuildings().subscribe(buildings => this.buildings=buildings);
  }

}
