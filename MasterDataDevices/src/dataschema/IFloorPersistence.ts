
export interface IFloorPersistence {
  domainId: string;
  buildingId: string;
  number: number;
  description: string;
  map: number[][];
  initialPosition: number[];
  initialDirection: number;
}