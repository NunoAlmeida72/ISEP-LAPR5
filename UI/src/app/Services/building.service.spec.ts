import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BuildingService } from './building.service';
import { Building } from '../Interfaces/building';

describe('BuildingService', () => {
  let httpTestingController: HttpTestingController;
  let service: BuildingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BuildingService]
    });
    service = TestBed.inject(BuildingService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a POST request to create a building', () => {
    const mockBuilding: Building = {
      code: '12A5B',
      name: 'Eng',
      description: 'Eng building',
      width: 10,
      depth: 5
    };

    service.createBuilding(mockBuilding).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne('http://localhost:4000/api/buildings');
    expect(req.request.method).toBe('POST');
    req.flush(mockBuilding);
  });

  it('should send a PATCH request to update a building', () => {
    const mockBuilding: Building = {
      code: '12A5B',
      name: 'Elec',
      description: 'Elec building',
      width: 10,
      depth: 5
    };

    service.updateBuilding(mockBuilding).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne('http://localhost:4000/api/buildings');
    expect(req.request.method).toBe('PATCH');
    req.flush(mockBuilding);
  });

  it('should send a GET request to get buildings', () => {

    service.getBuildings().subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne('http://localhost:4000/api/buildings');
    expect(req.request.method).toBe('GET');
  });

  it('should send a GET request to get buildings with a number of floors between 2 values', () => {

    service.getRobotsByTaskOrDesignation("task12").subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne('http://localhost:4000/api/buildings/0/5');
    expect(req.request.method).toBe('GET');
  });
});
