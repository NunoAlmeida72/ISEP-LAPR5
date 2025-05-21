

export interface IElevatorPersistence {
    domainId: string;
    code: string;
    brand: string;
    model: string;
    serialNumber: string;
    description: string;
    buildingId: string;
    floorsIds: string[];
    posX: number;
    posY: number;
}