import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {  RobotService } from './robot.service';
import { Robot } from '../Interfaces/robot';

describe('RobotService', () => {
  let httpTestingController: HttpTestingController;
  let service: RobotService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RobotService]
    });
    service = TestBed.inject(RobotService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a POST request to create a robot', () => {
    const mockRobot: Robot = {
      code: '1213',
      name: 'robot-A',
      robotTypeId: '123',
      number: '5',
      description: 'A flying robot'
    };

    service.createRobot(mockRobot).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne('http://localhost:4000/api/robots');
    expect(req.request.method).toBe('POST');
    req.flush(mockRobot);
  });

  it('should send a PATCH request to disable a robot', () => {
    const mockRobot: Robot = {
      code: '1213',
      name: 'robot-A',
      robotTypeId: '123',
      number: '5',
      description: 'A flying robot'
    };

    service.disableRobot(mockRobot).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne('http://localhost:4000/api/robots');
    expect(req.request.method).toBe('PATCH');
    req.flush(mockRobot);
  });

  it('should send a GET request to get robots', () => {

    service.getRobots().subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne('http://localhost:4000/api/robots');
    expect(req.request.method).toBe('GET');
  });

  it('should send a GET request to get robots with a certain task', () => {

    service.getRobotsByTaskOrDesignation("task12").subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne('http://localhost:4000/api/robots/task12');
    expect(req.request.method).toBe('GET');
  });
});
