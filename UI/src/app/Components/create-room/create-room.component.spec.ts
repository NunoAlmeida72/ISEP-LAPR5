import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRoomComponent } from './create-room.component';
import { RoomService } from 'src/app/Services/room.service';
import { Room } from 'src/app/Interfaces/room';
import { of } from 'rxjs';

describe('CreateRoomComponent', () => {
  let component: CreateRoomComponent;
  let fixture: ComponentFixture<CreateRoomComponent>;
  let roomService: RoomService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateRoomComponent],
      providers:[RoomService]
    });
    fixture = TestBed.createComponent(CreateRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).true;
  });

  it('should call createRoom method with correct data', () => {
    const newRoom: Room = {
      floorId: 'sada',
      name: 'B202',
      category: 'Lab',
      description: 'aaaaaaa',
    };

    spyOn(roomService, 'createRoom').and.returnValue(of(newRoom));

    component.room = newRoom; // Set component data to the new building

    component.createRoom();

    expect(roomService.createRoom).calledOnce;
  });
});
