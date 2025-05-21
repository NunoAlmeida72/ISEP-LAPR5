
import { Room } from "../../../src/domain/room";
import IRoomDTO from "../../../src/dto/IRoomDTO";

import {expect} from 'chai'

describe('Room', () => {
  it('should create a valid room', () => {
    const roomDTO = {
      floorId: '123',
      name: 'B101',
      category: 'Meeting Room',
      description: 'A description',
      id:"",
      doorPosX:1,
      doorPosY:2
    }as IRoomDTO;

    const room = Room.create(roomDTO);

    expect(room.isSuccess).to.equal(true);
    expect(room.getValue().floorId).to.equal(roomDTO.floorId);
    expect(room.getValue().name).to.equal(roomDTO.name);
    expect(room.getValue().category).to.equal(roomDTO.category);
    expect(room.getValue().description).to.equal(roomDTO.description);
  });

  it('should fail to create a room with missing floorId', () => {
    const roomDTO = {
      name: 'Room 101',
      category: 'Meeting Room',
      description: 'A description',
      id:"",
      doorPosX:1,
      doorPosY:2
    }as  IRoomDTO;

    const room = Room.create(roomDTO);

    expect(room.isFailure).to.equal(true);
    expect(room.errorValue()).to.equal('Must provide a floor id');
  });

  it('should fail to create a room with a long name', () => {
    const roomDTO = {
      floorId: '123',
      name: 'Very Long Room Name',
      category: 'Meeting Room',
      description: 'A description',
      id: "",
      doorPosX:1,
      doorPosY:2
    } as IRoomDTO;

    const room = Room.create(roomDTO);

    expect(room.isFailure).to.equal(true);
    expect(room.errorValue()).to.equal('Room name cant have more than 4 characters');
  });

  it('should fail to create a room with a undefined description', () => {
    const roomDTO= {
      floorId: '123',
      name: 'Very Long Room Name',
      category: 'Meeting Room',
      id:"",
      doorPosX:1,
      doorPosY:2
    }as IRoomDTO;

    const room = Room.create(roomDTO);

    expect(room.isFailure).to.equal(true);
    expect(room.errorValue()).to.equal('Must provide a room description');
  });

  it('should fail to create a room with a undefined category', () => {
    const roomDTO = {
      floorId: '123',
      name: 'Very Long Room Name',
      description: 'A description',
      id:"",
      doorPosX:1,
      doorPosY:2
    }as IRoomDTO;

    const room = Room.create(roomDTO);

    expect(room.isFailure).to.equal(true);
    expect(room.errorValue()).to.equal('Must provide a room category');
  });
});
