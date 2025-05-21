import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFloorsWithConnectionsComponent } from './list-floors-with-connections.component';
import { FloorService } from 'src/app/Services/floor.service';
import { Floor } from 'src/app/Interfaces/floor';
import { of } from 'rxjs';

describe('ListFloorsWithConnectionsComponent', () => {
  let component: ListFloorsWithConnectionsComponent;
  let fixture: ComponentFixture<ListFloorsWithConnectionsComponent>;
  let floorService:FloorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListFloorsWithConnectionsComponent],
      providers:[FloorService]
    });
    fixture = TestBed.createComponent(ListFloorsWithConnectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call createFloor method with correct data', () => {
    const newFloor: Floor[]= [{
      buildingId:"assdasdas",
      description: 'Description of the new building',
      number:1
    }];

    spyOn(floorService, 'getFloorsWithConnections').and.returnValue(of(newFloor));

    component.getFloors();

    expect(floorService.getFloorsWithConnections).calledOnce;
    expect(component.floors).equal(newFloor);
  });
});
