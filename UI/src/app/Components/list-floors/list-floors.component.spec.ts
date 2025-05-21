import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFloorsComponent } from './list-floors.component';
import { FloorService } from 'src/app/Services/floor.service';
import { Floor } from 'src/app/Interfaces/floor';
import { of } from 'rxjs';

describe('ListFloorsComponent', () => {
  let component: ListFloorsComponent;
  let fixture: ComponentFixture<ListFloorsComponent>;
  let floorService:FloorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListFloorsComponent],
      providers:[FloorService]
    });
    fixture = TestBed.createComponent(ListFloorsComponent);
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

    spyOn(floorService, 'getFloors').and.returnValue(of(newFloor));

    component.getFloors();

    expect(floorService.getFloors).calledOnce;
    expect(component.floors).equal(newFloor);
  });
});
