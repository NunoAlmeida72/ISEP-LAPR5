import { expect } from 'chai'
import { Floor } from "../../../src/domain/floor";
import IFloorDTO from "../../../src/dto/IFloorDTO";

describe('Floor', () => {
  it('should create a valid Floor', () => {
    const floorDTO: IFloorDTO = {
      buildingId: 'B001',
      number: 1,
      description: 'First Floor',
      map: [[1, 2], [3, 4]],
      id: "",
      initialPosition: [1,1],
      initialDirection: 0
    };

    const floor = Floor.create(floorDTO);

    expect(floor.isSuccess).to.equal(true);
    expect(floor.getValue().buildingId).to.equal(floorDTO.buildingId);
    expect(floor.getValue().number).to.equal(floorDTO.number);
    expect(floor.getValue().description).to.equal(floorDTO.description);
  });

  it('should fail to create a Floor with invalid description', () => {

    // Test description exceeding 250 characters
    const invalidFloorDTO: IFloorDTO = {
      buildingId: 'B001',
      number: 1,
      description: 'A very long description that exceeds the maximum allowed character limit. A very long description that exceeds the maximum allowed character limit. A very long description that exceeds the maximum allowed character limit.aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      map: [[1, 2], [3, 4]],
      id: "",
      initialPosition: [1,1],
      initialDirection: 0
    };
    let floor = Floor.create(invalidFloorDTO);
    expect(floor.isFailure).to.equal(true);
    expect(floor.errorValue()).to.equal("Floor description cannot be longer than 250 characters")
  });

  it('should fail to create a Floor with missing buildingId', () => {

    const invalidFloorDTO= {
      number: 1,
      description: 'A very long description that doesnt exceeds the maximum allowed character limit',
      map: [[1, 2], [3, 4]],
      id: ""
    }as IFloorDTO;
    let floor = Floor.create(invalidFloorDTO);
    expect(floor.isFailure).to.equal(true);
    expect(floor.errorValue()).to.equal("Must provide the buildingId that the floor is in")
  });

  it('should fail to create a Floor with missing number', () => {

    const invalidFloorDTO= {
      description: 'A very long description that doesnt exceeds the maximum allowed character limit',
      map: [[1, 2], [3, 4]],
      id: ""
    }as IFloorDTO;
    let floor = Floor.create(invalidFloorDTO);
    expect(floor.isFailure).to.equal(true);
    expect(floor.errorValue()).to.equal("Must provide a floor number")
  });
});
