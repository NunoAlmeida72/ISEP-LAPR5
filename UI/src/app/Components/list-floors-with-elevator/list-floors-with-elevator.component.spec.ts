import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFloorsWithElevatorComponent } from './list-floors-with-elevator.component';
import { FloorService } from 'src/app/Services/floor.service';
import { Floor } from 'src/app/Interfaces/floor';
import { of } from 'rxjs';

describe('ListFloorsWithElevatorComponent', () => {
  let component: ListFloorsWithElevatorComponent;
  let fixture: ComponentFixture<ListFloorsWithElevatorComponent>;
  let floorService: FloorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListFloorsWithElevatorComponent],
      providers: [floorService]
    });
    fixture = TestBed.createComponent(ListFloorsWithElevatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).true;
  });

  it('should call getFloors method and populate floors array', () => {
    const floorsList: Floor[] = [
      { /* Elevator 1 data */ },
      { /* Elevator 2 data */ },
      // ... more floors
    ];

    spyOn(floorService, 'getFloors').and.returnValue(of(floorsList));

    component.getFloors();

    expect(floorService.getFloors).calledOnce;
    expect(component.floors).equal(floorsList);
  });
});
