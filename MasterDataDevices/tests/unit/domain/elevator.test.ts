
import { Elevator } from "../../../src/domain/elevator";
import IElevatorDTO from "../../../src/dto/IElevatorDTO";

import {expect} from 'chai'

describe('Elevator', () => {
  it('should create a valid Elevator', () => {
    const elevatorDTO = {
      buildingId: '123',
      floorsIds:[],
      code: 'B101',
      brand:"2dasdas",
      model:"dasdas",
      serialNumber: 'adasdasd',
      description: 'A description',
      id:"",
      posX:1,
      posY:1
    }as IElevatorDTO;

    const elevator = Elevator.create(elevatorDTO);

    expect(elevator.isSuccess).to.equal(true);
    expect(elevator.getValue().buildingId).to.equal(elevatorDTO.buildingId);
    expect(elevator.getValue().code).to.equal(elevatorDTO.code);
    expect(elevator.getValue().brand).to.equal(elevatorDTO.brand);
    expect(elevator.getValue().model).to.equal(elevatorDTO.model);
    expect(elevator.getValue().serialNumber).to.equal(elevatorDTO.serialNumber);
    expect(elevator.getValue().description).to.equal(elevatorDTO.description);
  });

  it('should fail to create a elevator with missing code', () => {
    const elevatorDTO = {
      buildingId: '123',
      floorsIds:[],
      brand:"2dasdas",
      model:"dasdas",
      serialNumber: 'adasdasd',
      description: 'A description',
      id:"",
      posX:1,
      posY:1,
      code:''
    }as   IElevatorDTO;

    let elevator = Elevator.create(elevatorDTO);

    expect(elevator.isFailure).to.equal(true);
    expect(elevator.errorValue()).to.equal('Must provide a elevator code(max 5 characters)');

    const elevatorDTO2 = {
      code:"122333333333",
      buildingId: '123',
      floorsIds:["asdasdasd"],
      brand:"2dasdas",
      model:"dasdas",
      serialNumber: 'adasdasd',
      description: 'A description',
      id:"",
      posX:1,
      posY:1
    }as IElevatorDTO

    elevator = Elevator.create(elevatorDTO2);

    expect(elevator.isFailure).to.equal(true);
    expect(elevator.errorValue()).to.equal('Must provide a elevator code(max 5 characters)');

  });

  it('should fail to create a elevator with a missing description', () => {
    const elevatorDTO= {
      code:"122",
      buildingId: '123',
      floorsIds:["a"],
      brand:"2dasdas",
      model:"dasdas",
      serialNumber: 'adasdasd',
      id:"",
      posX:1,
      posY:1
    }as IElevatorDTO

    const elevator = Elevator.create(elevatorDTO);

    expect(elevator.isFailure).to.equal(true);
    expect(elevator.errorValue()).to.equal('Must provide a elevator description');
  });

  it('should fail to create a elevator with a big brand', () => {
    const elevatorDTO= {
      code:"123",
      buildingId: '123',
      floorsIds:[],
      brand:"2dasdasaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      model:"dasdas",
      serialNumber: 'adasdasd',
      description:"sadasdasdasd",
      id:"",
      posX:1,
      posY:1
    }as IElevatorDTO

    const elevator = Elevator.create(elevatorDTO);

    expect(elevator.isFailure).to.equal(true);
    expect(elevator.errorValue()).to.equal("Elevator brand can't have more than 50 characters");
  });

  it('should fail to create a elevator with a big model', () => {
    const elevatorDTO= {
      code:"1223",
      buildingId: '123',
      floorsIds:[],
      brand:"2dasdas",
      model:"dasdasaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      serialNumber: 'adasdasd',
      description:"sadasdasdasd",
      id:"",
      posX:1,
      posY:1
    }as IElevatorDTO

    const elevator = Elevator.create(elevatorDTO);

    expect(elevator.isFailure).to.equal(true);
    expect(elevator.errorValue()).to.equal("Elevator model can't have more than 50 characters");
  });

  it('should fail to create a elevator with a big serial number', () => {
    const elevatorDTO= {
      code:"122",
      buildingId: '123',
      floorsIds:[],
      brand:"2dasdas",
      serialNumber:"dasdasaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      model: 'adasdasd',
      description:"sadasdasdasd",
      id:"",
      posX:1,
      posY:1
    }as IElevatorDTO

    const elevator = Elevator.create(elevatorDTO);

    expect(elevator.isFailure).to.equal(true);
    expect(elevator.errorValue()).to.equal("Elevator serial number can't have more than 50 characters");
  });
});
