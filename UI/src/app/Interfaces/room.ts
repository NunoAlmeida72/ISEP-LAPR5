export interface Room {
    id?:string;
    floorId?: string;
    name?: string;
    category?: string;
    description?: string;
    posX?: number;
    posY?: number;
    width?: number;
    height?: number;
    doorPosX?: number;
    doorPosY?: number;
    isChecked?:boolean;
  }