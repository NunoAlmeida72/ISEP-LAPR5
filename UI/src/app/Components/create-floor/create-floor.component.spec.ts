import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFloorComponent } from './create-floor.component';
import { FloorService } from 'src/app/Services/floor.service';
import { Floor } from 'src/app/Interfaces/floor';
import { of } from 'rxjs';

describe('CreateFloorComponent', () => {
  let component: CreateFloorComponent;
  let fixture: ComponentFixture<CreateFloorComponent>;
  let floorService:FloorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateFloorComponent],
      providers:[FloorService]
    });
    fixture = TestBed.createComponent(CreateFloorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call createFloor method with correct data', () => {
    const newFloor: Floor = {
      buildingId:"assdasdas",
      description: 'Description of the new building',
      number:1
    };

    spyOn(floorService, 'createFloor').and.returnValue(of(newFloor));

    component.floor = newFloor; // Set component data to the new building

    component.createFloor();

    expect(floorService.createFloor).toHaveBeenCalledWith(newFloor);
  });
});
