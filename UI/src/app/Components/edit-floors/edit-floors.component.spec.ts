import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFloorsComponent } from './edit-floors.component';
import { FloorService } from 'src/app/Services/floor.service';
import { of } from 'rxjs';
import { Floor } from 'src/app/Interfaces/floor';

describe('EditFloorsComponent', () => {
  let component: EditFloorsComponent;
  let fixture: ComponentFixture<EditFloorsComponent>;
  let floorService:FloorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditFloorsComponent],
      providers:[FloorService]
    });
    fixture = TestBed.createComponent(EditFloorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call updateFloor method with correct data', () => {
    const newFloor: Floor= {
      buildingId:"assdasdas",
      description: 'Description of the new building',
      number:1
    };

    spyOn(floorService, 'updateFloor').and.returnValue(of(newFloor));

    component.editFloor;

    expect(floorService.updateFloor).calledOnce;
  });;
});
