import { UniqueEntityID } from "../../../src/core/domain/UniqueEntityID";
import { Building } from "../../../src/domain/building";
import IBuildingDTO from "../../../src/dto/IBuildingDTO";
import {expect}  from "chai";

// Mock a sample buildingDTO for testing
const sampleBuildingDTO = {
  name: "Sample Building",
  code: "B001",
  description: "A sample building",
  width: 10,
  depth: 20,
};

describe("Building Class", () => {
  it("should create a Building instance with valid input", () => {
    const id = new UniqueEntityID(); // Mock a UniqueEntityID
    const result = Building.create(sampleBuildingDTO as  IBuildingDTO, id);

    expect(result.isSuccess).to.equal(true);
    const building = result.getValue();
    expect(building.id).to.equal(id);
    expect(building.name).to.equal(sampleBuildingDTO.name);
    expect(building.code).to.equal(sampleBuildingDTO.code);
    expect(building.description).to.equal(sampleBuildingDTO.description);
    expect(building.width).to.equal(sampleBuildingDTO.width);
    expect(building.depth).to.equal(sampleBuildingDTO.depth);
  });

  it("should fail to create a Building instance with an invalid code", () => {
    const invalidDTO = { ...sampleBuildingDTO, code: "ABCD123" };
    const result = Building.create(invalidDTO as IBuildingDTO);

    expect(result.isFailure).to.equal(true);
    expect(result.errorValue()).to.equal("Must provide a building code(max 5 characters)");
  });

  it("should fail to create a Building instance with missing description", () => {
    const invalidDTO = { ...sampleBuildingDTO, description: "" };
    const result = Building.create(invalidDTO as IBuildingDTO);

    expect(result.isFailure).to.equal(true);
    expect(result.errorValue()).to.equal("Must provide a building description");
  });

  it("should fail to create a Building instance with zero width and depth", () => {
    const invalidDTO = { ...sampleBuildingDTO, width: 0, depth: 0 };
    const result = Building.create(invalidDTO  as IBuildingDTO);

    expect(result.isFailure).to.equal(true);
    expect(result.errorValue()).to.equal(
      "Must provide the building non zero values to width and depth of the building"
    );
  });

  it("should fail to create a Building instance with a name longer than 50 characters", () => {
    const longName = "A".repeat(51);
    const invalidDTO = { ...sampleBuildingDTO, name: longName };
    const result = Building.create(invalidDTO as IBuildingDTO);

    expect(result.isFailure).to.equal(true);
    expect(result.errorValue()).to.equal("Building name cant have more than 50 characters");
  });
});
