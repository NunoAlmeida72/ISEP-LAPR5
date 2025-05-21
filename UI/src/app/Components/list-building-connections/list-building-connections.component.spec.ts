import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBuildingConnectionsComponent } from './list-building-connections.component';
import { BuildingConnectionService } from 'src/app/Services/buildingconnection.service';
import { BuildingConnection } from 'src/app/Interfaces/buildingconnection';
import { of } from 'rxjs';

describe('ListBuildingConnectionsComponent', () => {
  let component: ListBuildingConnectionsComponent;
  let fixture: ComponentFixture<ListBuildingConnectionsComponent>;
  let buildingConnectionService: BuildingConnectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListBuildingConnectionsComponent],
      providers:[BuildingConnectionService]
    });
    fixture = TestBed.createComponent(ListBuildingConnectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).true;
  });

  it('should call getBuildingConnections method with correct data', () => {
    const buildingConnectionsList: BuildingConnection[] = [
      { /* Building Connection 1 data */ },
      { /* Building Connection 2 data */ },
      // ... more Building Connections
    ];

    spyOn(buildingConnectionService, 'getBuildingConnections').and.returnValue(of(buildingConnectionsList));

    component.getBuildingConnections();

    expect(buildingConnectionService.getBuildingConnections).calledOnce;
    expect(component.getBuildingConnections).equal(buildingConnectionsList);
  });
});