import {expect} from 'chai'; // Use a biblioteca de asserção de sua escolha
import { BuildingConnection } from './../../../src/domain/buildingConnection';

describe('BuildingConnection', () => {
  // Mock para IBuildingConnectionDTO
  const mockBuildingConnectionDTO = {
    id: '12345',
    floor1Id: 'floor1',
    floor2Id: 'floor2',
    posX: 1,
    posY: 2
  };

  it('should create a valid BuildingConnection', () => {
    const result = BuildingConnection.create(mockBuildingConnectionDTO);
    expect(result.isSuccess).to.equal(true);

    if (result.isSuccess) {
      const buildingConnection = result.getValue();
      expect(buildingConnection.floor1Id).to.equal(mockBuildingConnectionDTO.floor1Id);
      expect(buildingConnection.floor2Id).to.equal(mockBuildingConnectionDTO.floor2Id);
    }
  });

  it('should not create a BuildingConnection without floor1Id', () => {
    const invalidDTO = { ...mockBuildingConnectionDTO, floor1Id: '' };
    const result = BuildingConnection.create(invalidDTO);
    expect(result.isFailure).to.equal(true);
    expect(result.error).to.equal('Must provide a floor id');
  });

  it('should not create a BuildingConnection without floor2Id', () => {
    const invalidDTO = { ...mockBuildingConnectionDTO, floor2Id: '' };
    const result = BuildingConnection.create(invalidDTO);
    expect(result.isFailure).to.equal(true);
    expect(result.error).to.equal('Must provide a floor id');
  });

  it('should get and set values correctly', () => {
    const result = BuildingConnection.create(mockBuildingConnectionDTO);
    expect(result.isSuccess).to.equal(true);

    if (result.isSuccess) {
      const buildingConnection = result.getValue();

      // Test getters
      expect(buildingConnection.floor1Id).to.equal(mockBuildingConnectionDTO.floor1Id);
      expect(buildingConnection.floor2Id).to.equal(mockBuildingConnectionDTO.floor2Id);

      // Test setters
      buildingConnection.floor1Id = 'newFloor1';
      buildingConnection.floor2Id = 'newFloor2';
      expect(buildingConnection.floor1Id).to.equal('newFloor1');
      expect(buildingConnection.floor2Id).to.equal('newFloor2');
    }
  });
});