
import { Robot } from "../../../src/domain/robot";
import IRobotDTO from "../../../src/dto/IRobotDTO";

import { expect } from 'chai'


describe('Robot', () => {
  it('should create a valid Robot', () => {
    const robotDTO: IRobotDTO = {
      code: 'R123',
      name: 'Robot A',
      robotTypeId: 'RT001',
      number: '12345',
      status: true,
      description: 'A description within 250 characters.',
      id:"11111"
    };

    const robot = Robot.create(robotDTO);

    expect(robot.isSuccess).to.equal(true);
    expect(robot.getValue().code).to.equal(robotDTO.code);
    expect(robot.getValue().name).to.equal(robotDTO.name);
    expect(robot.getValue().robotTypeId).to.equal(robotDTO.robotTypeId);
    expect(robot.getValue().number).to.equal(robotDTO.number);
    expect(robot.getValue().status).to.equal(true);
    expect(robot.getValue().description).to.equal(robotDTO.description);
  });

  it('should fail to create a Robot with missing or invalid code', () => {
    // Test missing code
    const invalidRobotDTO1= {
      name: 'Robot A',
      robotTypeId: 'RT001',
      number: 'SN12345',
      status: true,
      description: 'A description within 250 characters.',
      id:"11111"
    }as  IRobotDTO;
    let robot = Robot.create(invalidRobotDTO1);
    expect(robot.isFailure).to.equal(true);
    expect(robot.errorValue()).to.equal("Must provide a robot code(max 30 characters)");

    const invalidRobotDTO2: IRobotDTO = {
      code: 'This code is way too long and exceeds the maximum allowed characters limit',
      name: 'Robot A',
      robotTypeId: 'RT001',
      number: 'SN12345',
      status: true,
      description: 'A description within 250 characters.',
      id:"11111"
    };
    robot = Robot.create(invalidRobotDTO2);
    expect(robot.isFailure).to.equal(true);
    expect(robot.errorValue()).to.equal("Must provide a robot code(max 30 characters)");
  });

  it('should fail to create a Robot with missing or invalid name', () => {
    // Test missing code
    const invalidRobotDTO1 ={
      code: 'Robot A',
      robotTypeId: 'RT001',
      number: 'SN12345',
      status: true,
      description: 'A description within 250 characters.',
      id: "",
    } as IRobotDTO;
    let robot = Robot.create(invalidRobotDTO1);
    expect(robot.isFailure).to.equal(true);
    expect(robot.errorValue()).to.equal("Must provide a robot name(max 30 characters)");

    const invalidRobotDTO2: IRobotDTO = {
      id:"111",
      name: 'This code is way too long and exceeds the maximum allowed characters limit',
      code: 'Robot A',
      robotTypeId: 'RT001',
      number: 'SN12345',
      status: true,
      description: 'A description within 250 characters.',
    };
    robot = Robot.create(invalidRobotDTO2);
    expect(robot.isFailure).to.equal(true);
    expect(robot.errorValue()).to.equal("Must provide a robot name(max 30 characters)");
  });

  it('should fail to create a Robot with missing or invalid serial name', () => {
    // Test missing code
    const invalidRobotDTO1= {
      code: 'Robot A',
      robotTypeId: 'RT001',
      status: true,
      description: 'A description within 250 characters.',
      id:"11111",
      name:"www"
    }as IRobotDTO;
    let robot = Robot.create(invalidRobotDTO1);
    expect(robot.isFailure).to.equal(true);
    expect(robot.errorValue()).to.equal("Must provide a robot serial number(max 50 characters)");

    const invalidRobotDTO2: IRobotDTO = {
      name: 'This name is',
      code: 'Robot A',
      robotTypeId: 'RT001',
      number: 'SN12345aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      status: true,
      description: 'A description within 250 characters.',
      id:"11111"
    };
    robot = Robot.create(invalidRobotDTO2);
    expect(robot.isFailure).to.equal(true);
    expect(robot.errorValue()).to.equal("Must provide a robot serial number(max 50 characters)");
  });

  it('should fail to create a Robot with a description exceeding 250 characters', () => {
    const invalidRobotDTO: IRobotDTO = {
      code: 'R123',
      name: 'Robot A',
      robotTypeId: 'RT001',
      number: 'SN12345',
      status: true,
      description: 'A very long description that exceeds the maximum allowed character limit. A very long description that exceeds the maximum allowed character limit. A very long description that exceeds the maximum allowed character limit. A very long description that exceeds the maximum allowed character limit. A very long description that exceeds the maximum allowed character limit.',
      id:"11111"
    };

    const robot = Robot.create(invalidRobotDTO);
    expect(robot.isFailure).to.equal(true);
    expect(robot.errorValue()).to.equal("Robot description has a maximum of 250 characters");
  });
});
