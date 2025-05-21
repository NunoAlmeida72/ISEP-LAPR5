import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BuildingConnectionService } from './buildingconnection.service';
import { BuildingConnection } from '../Interfaces/buildingconnection';


describe('BuildingConnectionService', () => {
  let httpTestingController: HttpTestingController;
  let service: BuildingConnectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BuildingConnectionService]
    });
    service = TestBed.inject(BuildingConnectionService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a POST request to create a building connection', () => {
    const mockBuildingConnection: BuildingConnection = {
      floor1Id: 'sada',
      floor2Id: 'sadb',
    };

    service.createBuildingConnection(mockBuildingConnection).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne('http://localhost:4000/api/buildingConnections');
    expect(req.request.method).toBe('POST');
    req.flush(mockBuildingConnection);
  });

  it('should send a PUT request to update a building connection', () => {
    const mockBuildingConnection: BuildingConnection = {
      floor1Id: 'sadc',
      floor2Id: 'sadd',
    };

    service.updateAllBuildingConnection(mockBuildingConnection).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne('http://localhost:4000/api/buildingConnections');
    expect(req.request.method).toBe('PUT');
    req.flush(mockBuildingConnection);
  });

  it('should send a PATCH request to update a building connection', () => {
    const mockBuildingConnection: BuildingConnection = {
      floor1Id: 'sadc',
      floor2Id: 'sadb',
    };

    service.updateBuildingConnection(mockBuildingConnection).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne('http://localhost:4000/api/buildingConnections');
    expect(req.request.method).toBe('PATCH');
    req.flush(mockBuildingConnection);
  });

  it('should send a GET request to get building connections', () => {

    service.getBuildingConnections("adasdasd", "wawawaaw").subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne('http://localhost:4000/api/buildingConnections/adasdasd/wawawaaw');
    expect(req.request.method).toBe('GET');
  });

  it('should send a GET request to get building connections', () => {

    service.getBuildingConnectionsByFloorId("sadb").subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne('http://localhost:4000/api/buildingConnections/sadb');
    expect(req.request.method).toBe('GET');
  });


});
