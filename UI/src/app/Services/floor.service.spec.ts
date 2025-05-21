import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FloorService } from './floor.service';
import { Floor } from '../Interfaces/floor'; // Import the Buildings interface

describe('FloorService', () => {
  let httpTestingController: HttpTestingController;
  let service: FloorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FloorService]
    });
    service = TestBed.inject(FloorService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a POST request to create a floor', () => {
    const mockFloor: Floor = {
      buildingId: 'sadddddddddd',
      number: 12,
      description: 'aaaa'
    };

    service.createFloor(mockFloor).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne('http://localhost:4000/api/floors');
    expect(req.request.method).toBe('POST');
    req.flush(mockFloor);
  });

  it('should send a PUT request to update a floor', () => {
    const mockFloor: Floor = {
      buildingId: 'sadddddddddddddddd',
      number: 12,
      description: 'aaaa'
    };

    service.updateAllFloor(mockFloor).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne('http://localhost:4000/api/floors');
    expect(req.request.method).toBe('PUT');
    req.flush(mockFloor);
  });

  it('should send a PATCH request to update a floor', () => {
    const mockFloor: Floor = {
      buildingId: 'sadddddddddddddddd',
      number: 12,
      description: 'aaaa'
    };

    service.updateFloor(mockFloor).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne('http://localhost:4000/api/floors');
    expect(req.request.method).toBe('PATCH');
    req.flush(mockFloor);
  });

  it('should send a GET request to get floors', () => {

    service.getFloors("adasdasd").subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne('http://localhost:4000/api/floors/adasdasd');
    expect(req.request.method).toBe('GET');
  });

  it('should send a GET request to get floors', () => {

    service.getFloorsWithConnections("adasdasd").subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne('http://localhost:4000/api/floors/withConnections/adasdasd');
    expect(req.request.method).toBe('GET');
  });

  it('should send a GET request to get floors', () => {

    service.getFloorsWithElevator("adasdasd").subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne('http://localhost:4000/api/floors/buildings/elevator/adasdasd');
    expect(req.request.method).toBe('GET');
  });

  it('should send a PATCH request to load floor map', () => {

    service.loadMap({}).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne('http://localhost:4000/api/floors/load-maps');
    expect(req.request.method).toBe('PATCH');
  });
});
