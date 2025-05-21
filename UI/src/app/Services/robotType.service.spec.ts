import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {  RobotTypeService } from './robotType.service';
import { RobotType } from '../Interfaces/robotType';

describe('RobotTypeService', () => {
  let httpTestingController: HttpTestingController;
  let service: RobotTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RobotTypeService]
    });
    service = TestBed.inject(RobotTypeService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a POST request to create a robotType', () => {
    const mockRobotType: RobotType = {
      type: 'robot-A',
      brand: 'Continente',
      model: 'Voador-1',
      possibleTasks: ['voar']
    };

    service.createRobotType(mockRobotType).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne('http://localhost:4000/api/robotTypes');
    expect(req.request.method).toBe('POST');
    req.flush(mockRobotType);
  });

  it('should send a GET request to get robotTypes', () => {

    service.getRobotTypes().subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne('http://localhost:4000/api/robotTypes');
    expect(req.request.method).toBe('GET');
  });

});
