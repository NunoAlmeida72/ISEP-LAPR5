
import { RobotType } from "../../../src/domain/robotType";
import IRobotTypeDTO from "../../../src/dto/IRobotTypeDTO";

import { expect } from 'chai'


describe('RobotType', () => {
  it('should create a valid RobotType', () => {
    const robotTypeDTO={
      type: 'Type A',
      brand: 'Brand X',
      model: 'Model 123',
      possibleTasks: ['Task 1', 'Task 2'],
    }as IRobotTypeDTO;

    const robotType = RobotType.create(robotTypeDTO);

    expect(robotType.isSuccess).to.equal(true);
    expect(robotType.getValue().type).to.equal(robotTypeDTO.type);
    expect(robotType.getValue().brand).to.equal(robotTypeDTO.brand);
    expect(robotType.getValue().model).to.equal(robotTypeDTO.model);
    expect(robotType.getValue().possibleTasks).to.equal(robotTypeDTO.possibleTasks);
  });

  it('should fail to create a RobotType with missing or invalid type', () => {
    // Test missing type
    const invalidRobotTypeDTO1 = {
      brand: 'Brand X',
      model: 'Model 123',
      possibleTasks: ['Task 1', 'Task 2'],
    }as IRobotTypeDTO;
    let robotType = RobotType.create(invalidRobotTypeDTO1);
    expect(robotType.isFailure).to.equal(true);
    expect(robotType.errorValue()).to.equal("Must provide a Robot Type type (max 25 characters)")

    // Test invalid brand length
    const invalidRobotTypeDTO2 = {
      type: 'Type Aaadafdsfasdfasdfasdfasdffdsfadsfasdf',
      brand: 'This',
      model: 'Model 123',
      possibleTasks: ['Task 1', 'Task 2'],
    } as IRobotTypeDTO;
    robotType = RobotType.create(invalidRobotTypeDTO2);
    expect(robotType.isFailure).to.equal(true);
    expect(robotType.errorValue()).to.equal("Must provide a Robot Type type (max 25 characters)")
  });

  it('should fail to create a RobotType with missing or invalid brand', () => {
    // Test missing type
    const invalidRobotTypeDTO1 = {
      type:"TIPOA",
      model: 'Model 123',
      possibleTasks: ['Task 1', 'Task 2'],
    }as IRobotTypeDTO;
    let robotType = RobotType.create(invalidRobotTypeDTO1);
    expect(robotType.isFailure).to.equal(true);
    expect(robotType.errorValue()).to.equal("Must provide a Robot Type brand (max 50 characters)")

    const invalidRobotTypeDTO2 = {
      type:"TIPOA",
      brand: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      model: 'Model 123',
      possibleTasks: ['Task 1', 'Task 2'],
    }as IRobotTypeDTO;
    robotType = RobotType.create(invalidRobotTypeDTO2);
    expect(robotType.isFailure).to.equal(true);
    expect(robotType.errorValue()).to.equal("Must provide a Robot Type brand (max 50 characters)")
  });

  it('should fail to create a RobotType with missing or invalid model', () => {
    // Test missing type
    const invalidRobotTypeDTO1 = {
      type:"TIPOA",
      brand: 'Model',
      possibleTasks: ['Task 1', 'Task 2'],
    }as IRobotTypeDTO;
    let robotType = RobotType.create(invalidRobotTypeDTO1);
    expect(robotType.isFailure).to.equal(true);
    expect(robotType.errorValue()).to.equal("Must provide a Robot Type model (max 100 characters)")

    const invalidRobotTypeDTO2 = {
      type:"TIPOA",
      model: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      brand: 'Model',
      possibleTasks: ['Task 1', 'Task 2'],
    }as IRobotTypeDTO;
    robotType = RobotType.create(invalidRobotTypeDTO2);
    expect(robotType.isFailure).to.equal(true);
    expect(robotType.errorValue()).to.equal("Must provide a Robot Type model (max 100 characters)")
  });

  it('should fail to create a RobotType with missing tasks', () => {
    // Test missing type
    const invalidRobotTypeDTO1= {
      type: "TIPOA",
      brand: 'Model',
      model: "dasdss",
      possibleTasks: [],
      id:""
    } as  IRobotTypeDTO;
    let robotType = RobotType.create(invalidRobotTypeDTO1);
    expect(robotType.isFailure).to.equal(true);
    expect(robotType.errorValue()).to.equal("Must provide the Robot Type possible tasks")
  });
});
