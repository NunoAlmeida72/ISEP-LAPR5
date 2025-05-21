import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateElevatorComponent } from './create-elevator.component';
import { ElevatorService } from 'src/app/Services/elevator.service';
import { Elevator } from 'src/app/Interfaces/elevator';
import { of } from 'rxjs';

describe('CreateFloorComponent', () => {
  let component: CreateElevatorComponent;
  let fixture: ComponentFixture<CreateElevatorComponent>;
  let floorService: ElevatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateElevatorComponent],
      providers:[ElevatorService]
    });
    fixture = TestBed.createComponent(CreateElevatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).true;
  });

  it('should call createElevator method with correct data', () => {
    const newElevator: Elevator = {
      buildingId: 'sadddddddddd',
      floorsIds: ['sadddddddddd', 'sadddddd'],
      code: 'asd',
      brand: 'asd',
      model: 'asd',
      serialNumber: 'asd',
      description: 'aaaa'
    };

    spyOn(floorService, 'createElevator').and.returnValue(of(newElevator));

    component.elevator = newElevator; // Set component data to the new building

    component.createElevator();

    expect(floorService.createElevator).calledOnce;
  });
});
