import { Service, Inject } from 'typedi';
import config from "../../config";
import IBuildingConnectionDTO from '../dto/IBuildingConnectionDTO';
import { BuildingConnection } from "../domain/buildingConnection";
import IBuildingConnectionRepo from '../services/IRepos/IBuildingConnectionRepo';
import IBuildingConnectionService from './IServices/IBuildingConnectionService';
import { Result } from "../core/logic/Result";
import { BuildingConnectionMap } from "../mappers/BuildingConnectionMap";
import IFloorRepo from '../services/IRepos/IFloorRepo';

@Service()
export default class BuildingConnectionService implements IBuildingConnectionService {
  constructor(
      @Inject(config.repos.buildingConnection.name) private buildingConnectionRepo : IBuildingConnectionRepo,
      @Inject(config.repos.floor.name) private floorRepo : IFloorRepo
  ) {}

  public async createBuildingConnection(buildingConnectionDTO: IBuildingConnectionDTO): Promise<Result<IBuildingConnectionDTO>> {
    try {

        const floorOrError1 = await this.floorRepo.findByDomainId(buildingConnectionDTO.floor1Id);

        if (floorOrError1 === null) {
          return Result.fail<IBuildingConnectionDTO>({"error": "Floor not found"});
        }

        const floorOrError2 = await this.floorRepo.findByDomainId(buildingConnectionDTO.floor2Id);

        if (floorOrError2 === null) {
          return Result.fail<IBuildingConnectionDTO>({"error": "Floor not found"});
        }

        if (floorOrError1.buildingId === floorOrError2.buildingId) {
          return Result.fail<IBuildingConnectionDTO>({"error": "The floors can not be from the same building"});
        }

        if (await this.buildingConnectionRepo.checkConnection(buildingConnectionDTO.floor1Id, buildingConnectionDTO.floor2Id)) {
          return Result.fail<IBuildingConnectionDTO>({"error": "The building connection already exists"});
        }

        const buildingConnectionOrError = await BuildingConnection.create( buildingConnectionDTO );

        if (buildingConnectionOrError.isFailure) {
            return Result.fail<IBuildingConnectionDTO>(buildingConnectionOrError.errorValue());
        }

        const buildingConnectionResult = buildingConnectionOrError.getValue();

        await this.buildingConnectionRepo.save(buildingConnectionResult);

        const buildingConnectionDTOResult = BuildingConnectionMap.toDTO( buildingConnectionResult ) as IBuildingConnectionDTO;
        return Result.ok<IBuildingConnectionDTO>( buildingConnectionDTOResult )
    } catch (e) {
      throw e;
    }
  }

  public async getBuildingConnectionsByFloorId(floorId: string): Promise<Result<IBuildingConnectionDTO[]>> {
    try {
      const buildingConnectionResult = await this.buildingConnectionRepo.findAll();

      const buildingConnections = [];

      if (buildingConnectionResult.length != 0){
        for (let i = 0; i < buildingConnectionResult.length; i++) {
          if (buildingConnectionResult[i].floor1Id===floorId || buildingConnectionResult[i].floor2Id===floorId) {
            buildingConnections.push(BuildingConnectionMap.toDTO(buildingConnectionResult[i]));
          }
        }
      }

      return Result.ok<IBuildingConnectionDTO[]>( buildingConnections );
    } catch (e) {
      throw e;
    }
  }

  public async listBuildingConnections(buildingId1: string, buildingId2: string): Promise<Result<IBuildingConnectionDTO[]>> {
    try {
      const buildingConnectionResult = await this.buildingConnectionRepo.findAll();

      const buildingConnections = [];

      if (buildingConnectionResult.length != 0){
        for (let i = 0; i < buildingConnectionResult.length; i++) {
          const floor1 = await this.floorRepo.findByDomainId(buildingConnectionResult[i].floor1Id);
          const floor2 = await this.floorRepo.findByDomainId(buildingConnectionResult[i].floor2Id);
          if ((floor1.buildingId === buildingId1 && floor2.buildingId === buildingId2) || (floor1.buildingId === buildingId2 && floor2.buildingId === buildingId1)) {
            buildingConnections.push(BuildingConnectionMap.toDTO(buildingConnectionResult[i]));
          }
        }
      }

      return Result.ok<IBuildingConnectionDTO[]>( buildingConnections );
    } catch (e) {
      throw e;
    }
  }

  public async updateBuildingConnection(buildingConnectionDTO: IBuildingConnectionDTO): Promise<Result<IBuildingConnectionDTO>> {
      try{
        const buildingConnectionResult = await this.buildingConnectionRepo.findByDomainId(buildingConnectionDTO.id);

        if(buildingConnectionResult == null){
            return Result.fail<IBuildingConnectionDTO>({"error": "The Building Connection does not exist"});
        }

        if (!buildingConnectionDTO.floor1Id) {
          const floorOrError2 = await this.floorRepo.findByDomainId(buildingConnectionDTO.floor2Id);

          if (floorOrError2 === null) {
            return Result.fail<IBuildingConnectionDTO>({"error": "The floor does not exist"});
          }

          const floorOrError1 = await this.floorRepo.findByDomainId(buildingConnectionResult.floor1Id);

          if (floorOrError1.buildingId === floorOrError2.buildingId) {
            return Result.fail<IBuildingConnectionDTO>({"error": "Building Connections can not have floors from the same building"});
          }

          if (await this.buildingConnectionRepo.checkConnection(buildingConnectionResult.floor1Id, buildingConnectionDTO.floor2Id)) {
            return Result.fail<IBuildingConnectionDTO>({"error": "The Building Connection already exists"});
          }
          
          buildingConnectionResult.floor2Id = buildingConnectionDTO.floor2Id;
        }else if (!buildingConnectionDTO.floor2Id) {
          const floorOrError1 = await this.floorRepo.findByDomainId(buildingConnectionDTO.floor1Id);

          if (floorOrError1 === null) {
            return Result.fail<IBuildingConnectionDTO>({"error": "The floor does not exist"});
          }

          const floorOrError2 = await this.floorRepo.findByDomainId(buildingConnectionResult.floor2Id);

          if (floorOrError1.buildingId === floorOrError2.buildingId) {
            return Result.fail<IBuildingConnectionDTO>({"error": "Building Connections can not have floors from the same building"});
          }

          if (await this.buildingConnectionRepo.checkConnection(buildingConnectionResult.floor2Id, buildingConnectionDTO.floor1Id)) {
            return Result.fail<IBuildingConnectionDTO>({"error": "The Building Connection already exists"});
          }
            
          buildingConnectionResult.floor1Id = buildingConnectionDTO.floor1Id;
        }else if (!!buildingConnectionDTO.floor1Id && !!buildingConnectionDTO.floor2Id) {
          const floorOrError1 = await this.floorRepo.findByDomainId(buildingConnectionDTO.floor1Id);

          if (floorOrError1 === null) {
            return Result.fail<IBuildingConnectionDTO>({"error": "The floor does not exist"});
          }

          const floorOrError2 = await this.floorRepo.findByDomainId(buildingConnectionDTO.floor2Id);

          if (floorOrError2 === null) {
            return Result.fail<IBuildingConnectionDTO>({"error": "The floor does not exist"});
          }

          if (floorOrError1.buildingId === floorOrError2.buildingId) {
            return Result.fail<IBuildingConnectionDTO>({"error": "Building Connections can not have floors from the same building"});
          }

          if (await this.buildingConnectionRepo.checkConnection(buildingConnectionDTO.floor1Id, buildingConnectionDTO.floor2Id)) {
            return Result.fail<IBuildingConnectionDTO>({"error": "The Building Connection already exists"});
          }
            
          buildingConnectionResult.floor1Id = buildingConnectionDTO.floor1Id;
          buildingConnectionResult.floor2Id = buildingConnectionDTO.floor2Id;
        }

        await this.buildingConnectionRepo.save(buildingConnectionResult);

        const buildingConnectionDTOResult = BuildingConnectionMap.toDTO( buildingConnectionResult ) as IBuildingConnectionDTO;
        return Result.ok<IBuildingConnectionDTO>( buildingConnectionDTOResult )
      }catch(e){
        throw e;
      }
  }

}
