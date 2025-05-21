import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditElevatorComponent } from './edit-elevator.component';
import { ElevatorService } from 'src/app/Services/elevator.service';
import { Elevator } from 'src/app/Interfaces/elevator';
import { of } from 'rxjs';

describe('EditElevatorComponent', () => {
  let component: EditElevatorComponent;
  let fixture: ComponentFixture<EditElevatorComponent>;
  let elevatorService: ElevatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditElevatorComponent],
      providers:[ElevatorService]
    });
    fixture = TestBed.createComponent(EditElevatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).true;
  });

  it('should call updateElevator method with correct data', () => {
    const editedElevator: Elevator = {
      buildingId: 'editedBuildingId',
      floorsIds: ['editedFloorId1', 'editedFloorId2'],
      code: 'editedCode',
      brand: 'editedBrand',
      model: 'editedModel',
      serialNumber: 'editedSerialNumber',
      description: 'editedDescription'
    };

    spyOn(elevatorService, 'updateElevator').and.returnValue(of(editedElevator));

    component.elevator = editedElevator; // Set component data to the edited elevator

    component.editFloor();

    expect(elevatorService.updateElevator).calledOnce;
  });
});
