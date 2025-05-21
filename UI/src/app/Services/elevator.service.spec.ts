import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ElevatorService } from './elevator.service';
import { Elevator } from '../Interfaces/elevator';

describe('ElevatorService', () => {
  let httpTestingController: HttpTestingController;
  let service: ElevatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ElevatorService]
    });
    service = TestBed.inject(ElevatorService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a POST request to create a elevator', () => {
    const mockFloor: Elevator = {
      buildingId: 'sadddddddddd',
      floorsIds: ['sadddddddddd', 'sadddddd'],
      code: 'asd',
      brand: 'asd',
      model: 'asd',
      serialNumber: 'asd',
      description: 'aaaa'
    };

    service.createElevator(mockFloor).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne('http://localhost:4000/api/elevators');
    expect(req.request.method).toBe('POST');
    req.flush(mockFloor);
  });

  it('should send a PUT request to update a elevator', () => {
    const mockFloor: Elevator = {
      buildingId: 'sadddddddddd',
      floorsIds: ['sadddddddddd', 'sadddddd'],
      code: 'asd',
      brand: 'asd',
      model: 'asd',
      serialNumber: 'asd',
      description: 'aaaa'
    };

    service.updateAllElevator(mockFloor).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne('http://localhost:4000/api/elevators');
    expect(req.request.method).toBe('PUT');
    req.flush(mockFloor);
  });

  it('should send a PATCH request to update a elevator', () => {
    const mockFloor: Elevator = {
      buildingId: 'sadddddddddd',
      floorsIds: ['sadddddddddd', 'sadddddd'],
      code: 'asd',
      brand: 'asd',
      model: 'asd',
      serialNumber: 'asd',
      description: 'aaaa'
    };

    service.updateElevator(mockFloor).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne('http://localhost:4000/api/elevators');
    expect(req.request.method).toBe('PATCH');
    req.flush(mockFloor);
  });

  it('should send a GET request to get elevators', () => {

    service.getElevators("adasdasd").subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne('http://localhost:4000/api/elevators/adasdasd');
    expect(req.request.method).toBe('GET');
  });
});
