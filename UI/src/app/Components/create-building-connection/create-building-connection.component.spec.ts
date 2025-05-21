import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBuildingConnectionComponent } from './create-building-connection.component';
import { BuildingConnectionService } from 'src/app/Services/buildingconnection.service';
import { BuildingConnection } from 'src/app/Interfaces/buildingconnection';
import { of } from 'rxjs';

describe('CreateBuildingConnectionComponent', () => {
  let component: CreateBuildingConnectionComponent;
  let fixture: ComponentFixture<CreateBuildingConnectionComponent>;
  let buildingConnectionService: BuildingConnectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateBuildingConnectionComponent],
      providers:[BuildingConnectionService]
    });
    fixture = TestBed.createComponent(CreateBuildingConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).true;
  });

  it('should call createBuildingConnection method with correct data', () => {
    const newBuildingConnection: BuildingConnection = {
      floor1Id: 'sada',
      floor2Id: 'sadb',
    };

    spyOn(buildingConnectionService, 'createBuildingConnection').and.returnValue(of(newBuildingConnection));

    component.buildingconnection = newBuildingConnection; // Set component data to the new building

    component.createBuildingConnection();

    expect(buildingConnectionService.createBuildingConnection).calledOnce;
  });

});
