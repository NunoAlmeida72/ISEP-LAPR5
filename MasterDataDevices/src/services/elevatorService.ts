import { Service, Inject} from "typedi";
import config from "../../config";
import IElevatorDTO from "../dto/IElevatorDTO";
import { Elevator } from "../domain/elevator";
import IElevatorRepo from "./IRepos/IElevatorRepo";
import IElevatorService from "./IServices/IElevatorService";
import { Result } from "../core/logic/Result";
import { ElevatorMap } from "../mappers/ElevatorMap";
import IFloorRepo from "./IRepos/IFloorRepo";
import IBuildingRepo from "./IRepos/IBuildingRepo";

@Service()
export default class ElevatorService implements IElevatorService{
    constructor(
        @Inject(config.repos.elevator.name) private elevatorRepo : IElevatorRepo,
        @Inject(config.repos.floor.name) private floorRepo : IFloorRepo,
        @Inject(config.repos.building.name) private buildingRepo : IBuildingRepo

    ){}

    public async createElevator(elevatorDTO: IElevatorDTO): Promise<Result<IElevatorDTO>> {

        try{

            // Check if Building Exists
            const buildingOrError= await this.buildingRepo.findByDomainId(elevatorDTO.buildingId);

            if(buildingOrError == null){
                return Result.fail<IElevatorDTO>({"error":elevatorDTO});
            }

            // Check if Floors Exists

            elevatorDTO.floorsIds.forEach(async (floorId) => {
                const floorOrError = await this.floorRepo.findByDomainId(floorId);
                if(floorOrError == null){
                    return Result.fail<IElevatorDTO>({"error":elevatorDTO});
                }
            });
            /*

            // TO-DO Check if an elevator was already made before

            const buildingHasElevator = await this.elevatorRepo.findByBuildingId(elevatorDTO.buildingId);

            // if building has elevator, then it will fail

            if(buildingHasElevator.length != 0){
                return Result.fail<IElevatorDTO>({"error":elevatorDTO});
            }*/

            const elevatorOrError = await Elevator.create(elevatorDTO);

            if(elevatorOrError.isFailure){
                return Result.fail<IElevatorDTO>({"error":elevatorOrError.errorValue()});
            }

            const elevatorResult = elevatorOrError.getValue();

            await this.elevatorRepo.save(elevatorResult);

            const elevatorDTOResult = ElevatorMap.toDto(elevatorResult) as IElevatorDTO;
            return Result.ok<IElevatorDTO>(elevatorDTOResult);

        } catch(e){
            throw e;
        }
        
    }

    public async updateElevator(elevatorDTO: IElevatorDTO): Promise<Result<IElevatorDTO>> {
        try{
            const elevatorResult = await this.elevatorRepo.findByDomainId(elevatorDTO.id);

            if(elevatorResult == null){
                return Result.fail<IElevatorDTO>({"error":"Elevator Id does not exist"});
            }

            if(!!elevatorDTO.floorsIds) {
                elevatorResult.floorsIds = elevatorDTO.floorsIds;
            }

            if(!!elevatorDTO.code){
                elevatorResult.code = elevatorDTO.code;
            }

            if(!!elevatorDTO.description){
                elevatorResult.description=elevatorDTO.description;
            }

            if(!!elevatorDTO.brand){
                elevatorResult.brand=elevatorDTO.brand;
            }

            if(!!elevatorDTO.model){
                elevatorResult.model=elevatorDTO.model;
            }

            if(!!elevatorDTO.serialNumber){
                elevatorResult.serialNumber=elevatorDTO.serialNumber;
            }

            await this.elevatorRepo.save(elevatorResult);

            const elevatorDTOResult = ElevatorMap.toDto(elevatorResult) as IElevatorDTO;
            return Result.ok<IElevatorDTO>(elevatorDTOResult);

        } catch(e){
            throw e;
        }


        
    }

    public async listElevators(buildingId: string): Promise<Result<IElevatorDTO[]>> {
        
        try{
            
            const elevatorList = [];

            const elevatorsResult = await this.elevatorRepo.findByBuildingId(buildingId);

            if(elevatorsResult.length != 0){
                elevatorsResult.forEach(elevator => {
                    elevatorList.push(ElevatorMap.toDto(elevator));
                });
            }


            return Result.ok<IElevatorDTO[]>(elevatorList);

        } catch(e){
            throw e;
        }
    
    }

    
}