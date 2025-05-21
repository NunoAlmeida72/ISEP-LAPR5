import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBuildingComponent } from './edit-building.component';
import { BuildingService } from 'src/app/Services/building.service';
import { Building } from 'src/app/Interfaces/building';
import { of } from 'rxjs';

describe('EditBuildingComponent', () => {
    let component: EditBuildingComponent;
    let fixture: ComponentFixture<EditBuildingComponent>;
    let buildingService: BuildingService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [EditBuildingComponent],
            providers:[BuildingService]
        });
        fixture = TestBed.createComponent(EditBuildingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).true;
    });

    it('should call updateBuilding method with correct data', () => {
        const editedBuilding: Building = {
          code: 'editedCode',
          name: 'editedName',
          description: 'editedDescription',
          depth: 8,
          width: 8,
        };
    
        spyOn(buildingService, 'updateBuilding').and.returnValue(of(editedBuilding));
    
        component.building = editedBuilding; // Set component data to the edited elevator
    
        component.editBuilding();
    
        expect(buildingService.updateBuilding).calledOnce;
      });

});