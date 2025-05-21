import { Service, Inject } from 'typedi';
import config from "../../config";
import IBuildingDTO from '../dto/IBuildingDTO';
import { Building } from "../domain/building";
import IBuildingRepo from '../services/IRepos/IBuildingRepo';
import IFloorRepo from '../services/IRepos/IFloorRepo';
import IBuildingService from './IServices/IBuildingService';
import { Result } from "../core/logic/Result";
import { BuildingMap } from "../mappers/BuildingMap";

@Service()
export default class BuildingService implements IBuildingService {
  constructor(
      @Inject(config.repos.building.name) private buildingRepo : IBuildingRepo,
      @Inject(config.repos.floor.name) private floorRepo : IFloorRepo
  ) {}

  public async createBuilding(buildingDTO: IBuildingDTO): Promise<Result<IBuildingDTO>> {
    try {

      const buildingOrError = await Building.create( buildingDTO );

      if (buildingOrError.isFailure) {
        return Result.fail<IBuildingDTO>({"error":buildingOrError.errorValue()});
      }

      const buildingResult = buildingOrError.getValue();

      await this.buildingRepo.save(buildingResult);

      const buildingDTOResult = BuildingMap.toDTO( buildingResult ) as IBuildingDTO;
      return Result.ok<IBuildingDTO>( buildingDTOResult )
    } catch (e) {
      throw e;
    }
  }

  public async listBuildings(): Promise<Result<IBuildingDTO[]>> {
    try {
      const buildingResult = await this.buildingRepo.findAll();

      const buildings=[];

      if(buildingResult.length != 0){
        buildingResult.forEach((element) => {
          buildings.push(BuildingMap.toDTO(element));
        })
      }
      return Result.ok<IBuildingDTO[]>( buildings );
    } catch (e) {
      throw e;
    }
  }
  
  public async listBuildingsInFloorLimit(min: number, max: number): Promise<Result<IBuildingDTO[]>> {
    try {
      const buildingResult = await this.buildingRepo.findAll();

      const buildingsPromises = buildingResult.map(async (element) => {
        const buildingDTO = BuildingMap.toDTO(element);
        if (await this.floorRepo.floorInLimit(buildingDTO.id, min, max)) {
          return buildingDTO;
        }
        return null;
      });
  
      const buildings = await Promise.all(buildingsPromises);
  
      // Filter out null values
      const filteredBuildings = buildings.filter((building) => building !== null);
  
      return Result.ok<IBuildingDTO[]>(filteredBuildings);
    } catch (e) {
      throw e;
    }
  }

  public async updateBuilding(buildingDTO: IBuildingDTO): Promise<Result<IBuildingDTO>> {
      try{
        const buildingResult= await this.buildingRepo.findByDomainId(buildingDTO.id);

        if(buildingResult == null){
            return Result.fail<IBuildingDTO>({"error":"Building Id does not exist"});
        }

        if(!!buildingDTO.code){
          buildingResult.code = buildingDTO.code;
        }

        if(!!buildingDTO.description){
          buildingResult.description=buildingDTO.description;
        }

        if(!!buildingDTO.width){ 
          buildingResult.width=buildingDTO.width;
        }

        if(!!buildingDTO.depth){
          buildingResult.depth=buildingDTO.depth;
        }

        if(!!buildingDTO.name){
          buildingResult.name=buildingDTO.name;
        }

        await this.buildingRepo.save(buildingResult);

        const buildingDTOResult = BuildingMap.toDTO( buildingResult ) as IBuildingDTO;
        return Result.ok<IBuildingDTO>( buildingDTOResult )
      }catch(e){
        throw e;
      }
  }

}
