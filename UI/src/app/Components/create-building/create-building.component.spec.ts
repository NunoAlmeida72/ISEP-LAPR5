import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBuildingComponent } from './create-building.component';
import { BuildingService } from 'src/app/Services/building.service';
import { Building } from 'src/app/Interfaces/building';
import { of } from 'rxjs';

describe('CreateBuildingComponent', () => {
    let component: CreateBuildingComponent;
    let fixture: ComponentFixture<CreateBuildingComponent>;
    let buildingService: BuildingService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [CreateBuildingComponent],
            providers: [BuildingService]
        });
        fixture = TestBed.createComponent(CreateBuildingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).true;
    });

    it('should call createBuilding method with correct data', () => {
        const newBuilding: Building = {
          code: 'sadddddddddd',
          name: 'sadddddddddd',
          description: 'asd',
          width: 2,
          depth: 2
        };
    
        spyOn(buildingService, 'createBuilding').and.returnValue(of(newBuilding));
    
        component.building = newBuilding; // Set component data to the new building
    
        component.createBuilding();
    
        expect(buildingService.createBuilding).calledOnce;
      });
});