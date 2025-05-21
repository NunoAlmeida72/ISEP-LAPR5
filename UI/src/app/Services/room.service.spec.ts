import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RoomService } from './room.service';
import { Room } from '../Interfaces/room';

describe('RoomService', () => {
  let httpTestingController: HttpTestingController;
  let service: RoomService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RoomService]
    });
    service = TestBed.inject(RoomService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a POST request to create a room', () => {
    const mockRoom: Room = {
      floorId: 'sada',
      name: 'B304',
      category: 'Lab',
      description: 'aaaa',
    };

    service.createRoom(mockRoom).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne('http://localhost:4000/api/rooms');
    expect(req.request.method).toBe('POST');
    req.flush(mockRoom);
  });

  it('should send a GET request to get rooms', () => {

    service.listRoomsByFloorId("sada").subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne('http://localhost:4000/api/rooms/sada');
    expect(req.request.method).toBe('GET');
  });


});