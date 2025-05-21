import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBuildingsByMinMaxNumberOfFloorsComponent } from './list-buildings-by-min-max-number-of-floors.component';
import { BuildingService } from 'src/app/Services/building.service';
import { Building } from 'src/app/Interfaces/building';
import { of } from 'rxjs';

describe('ListBuildingsByMinMaxNumberOfFloorsComponent', () => {
  let component: ListBuildingsByMinMaxNumberOfFloorsComponent;
  let fixture: ComponentFixture<ListBuildingsByMinMaxNumberOfFloorsComponent>;
  let buildingService: BuildingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListBuildingsByMinMaxNumberOfFloorsComponent],
      providers: [BuildingService]
    });
    fixture = TestBed.createComponent(ListBuildingsByMinMaxNumberOfFloorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).true;
  });

  it('should call getBuildingsByMinMaxFloors method and populate buildings array', () => {
    const buildingsList: Building[] = [
      { /* Elevator 1 data */ },
      { /* Elevator 2 data */ },
      // ... more elevators
    ];

    spyOn(buildingService, 'getBuildingByMinMaxFloors').and.returnValue(of(buildingsList));

    component.getBuildingsByMinMaxFloors();

    expect(buildingService.getBuildingByMinMaxFloors).calledOnce;
    expect(component.buildings).equal(buildingsList);
  });
});
