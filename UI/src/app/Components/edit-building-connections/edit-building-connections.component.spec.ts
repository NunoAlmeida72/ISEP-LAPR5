import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBuildingConnectionsComponent } from './edit-building-connections.component';
import { BuildingConnectionService } from 'src/app/Services/buildingconnection.service';
import { BuildingConnection } from 'src/app/Interfaces/buildingconnection';
import { of } from 'rxjs';

describe('EditBuildingConnectionsComponent', () => {
  let component: EditBuildingConnectionsComponent;
  let fixture: ComponentFixture<EditBuildingConnectionsComponent>;
  let buildingConnectionService: BuildingConnectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditBuildingConnectionsComponent],
      providers:[BuildingConnectionService]
    });
    fixture = TestBed.createComponent(EditBuildingConnectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call updateBuildingConnection method with correct data', () => {
    const editedBuildingConnection: BuildingConnection = {
      floor1Id: 'editedfloor1Id',
      floor2Id: 'editedfloor2Id',
    };

    spyOn(buildingConnectionService, 'updateBuildingConnection').and.returnValue(of(editedBuildingConnection));

    component.buildingconnection = editedBuildingConnection; // Set component data to the edited elevator

    component.editBuildingConnection();

    expect(buildingConnectionService.updateBuildingConnection).toHaveBeenCalledWith(editedBuildingConnection);
  });
});