export interface Elevator {
  id?: string;
  buildingId?: string;
  floorsIds?: string[];
  code?: string;
  brand?: string;
  model?: string;
  serialNumber?: string;
  description?: string;
  posX?: number;
  posY?: number;
  isChecked?:boolean;
}

