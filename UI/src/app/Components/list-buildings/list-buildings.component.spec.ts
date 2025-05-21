import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBuildingsComponent } from './list-buildings.component';
import { BuildingService } from 'src/app/Services/building.service';
import { Building } from 'src/app/Interfaces/building';
import { of } from 'rxjs';

describe('ListBuildingsComponent', () => {
  let component: ListBuildingsComponent;
  let fixture: ComponentFixture<ListBuildingsComponent>;
  let buildingService: BuildingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListBuildingsComponent],
      providers: [BuildingService]
    });
    fixture = TestBed.createComponent(ListBuildingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).true;
  });

  it('should call getBuildings method and populate buildings array', () => {
    const buildingsList: Building[] = [
      { /* Elevator 1 data */ },
      { /* Elevator 2 data */ },
      // ... more elevators
    ];

    spyOn(buildingService, 'getBuildings').and.returnValue(of(buildingsList));

    component.getBuildings();

    expect(buildingService.getBuildings).calledOnce;
    expect(component.buildings).equal(buildingsList);
  });
});
