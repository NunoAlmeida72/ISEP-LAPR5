import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { ElevatorId } from "./elevatorId";

import IElevatorDTO from "../dto/IElevatorDTO";

interface ElevatorProps {
    code: string;
    buildingId: string;
    floorsIds: string[];
    brand: string;
    model: string;
    serialNumber: string;
    description: string;
    posX:number;
    posY:number;
}

export class Elevator extends AggregateRoot<ElevatorProps> {
    get id (): UniqueEntityID {
        return this._id;
    }

    get elevatorId (): ElevatorId {
        return new ElevatorId(this.elevatorId.toValue());
    }

    get code (): string {
        return this.props.code;
    }

    get buildingId (): string {
        return this.props.buildingId;
    }

    get floorsIds (): string[] {
        return this.props.floorsIds;
    }

    get brand (): string {
        return this.props.brand;
    }

    get model (): string {
        return this.props.model;
    }

    get serialNumber (): string {
        return this.props.serialNumber;
    }

    get description (): string {
        return this.props.description;
    }

    get posX():number{
        return this.props.posX;
    }

    get posY():number{
        return this.props.posY;
    }

    set code (code: string) {
        this.props.code = code;
    }

    set buildingId (buildingId: string) {
        this.props.buildingId = buildingId;
    }

    set floorsIds (floorsIds: string[]) {
        this.props.floorsIds = floorsIds;
    }

    set brand (brand: string) {
        this.props.brand = brand;
    }

    set model (model: string) {
        this.props.model = model;
    }

    set serialNumber (serialNumber: string) {
        this.props.serialNumber = serialNumber;
    }

    set description (description: string) {
        this.props.description = description;
    }

    set  posX(value:number){
        this.props.posX=value;
    }

    set  posY(value:number){
        this.props.posY=value;
    }


    private constructor (props: ElevatorProps, id?: UniqueEntityID){
        super(props,id);
    }

    public static create (elevatorDTO: IElevatorDTO, id?: UniqueEntityID): Result<Elevator> {
    
        if(!!elevatorDTO.code === false || elevatorDTO.code.length === 0 || elevatorDTO.code.length > 5){
            return Result.fail<Elevator>("Must provide a elevator code(max 5 characters)");
        } else if(!!elevatorDTO.description === false){
            return Result.fail<Elevator>("Must provide a elevator description");
        } else if(elevatorDTO.brand.length > 50){
            return Result.fail<Elevator>("Elevator brand can't have more than 50 characters");
        } else if(elevatorDTO.model.length > 50){
            return Result.fail<Elevator>("Elevator model can't have more than 50 characters");
        } else if(elevatorDTO.serialNumber.length > 50){
            return Result.fail<Elevator>("Elevator serial number can't have more than 50 characters");
        } else {
            const elevator = new Elevator({code: elevatorDTO.code, brand: elevatorDTO.brand, model: elevatorDTO.model, serialNumber: elevatorDTO.serialNumber, buildingId: elevatorDTO.buildingId, floorsIds: elevatorDTO.floorsIds, description: elevatorDTO.description,posX: elevatorDTO.posX,posY: elevatorDTO.posY}, id);
            return Result.ok<Elevator>(elevator);
        }
    }

}