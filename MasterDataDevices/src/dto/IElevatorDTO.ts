
export default interface IElevatorDTO {
    id: string;
    code: string;
    brand: string;
    model: string;
    serialNumber: string;
    buildingId: string;
    floorsIds: string[];
    description: string;
    posX: number;
    posY:number;
}