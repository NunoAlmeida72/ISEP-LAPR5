import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListElevatorComponent } from './list-elevator.component';
import { ElevatorService } from 'src/app/Services/elevator.service';
import { Elevator } from 'src/app/Interfaces/elevator';
import { of } from 'rxjs';

describe('ListElevatorComponent', () => {
  let component: ListElevatorComponent;
  let fixture: ComponentFixture<ListElevatorComponent>;
  let elevatorService: ElevatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListElevatorComponent],
      providers: [ElevatorService]
    });
    fixture = TestBed.createComponent(ListElevatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).true;
  });

  it('should call getElevators method and populate elevators array', () => {
    const elevatorsList: Elevator[] = [
      { /* Elevator 1 data */ },
      { /* Elevator 2 data */ },
      // ... more elevators
    ];

    spyOn(elevatorService, 'getElevators').and.returnValue(of(elevatorsList));

    component.getElevators();

    expect(elevatorService.getElevators).calledOnce;
    expect(component.elevators).equal(elevatorsList);
  });
});
