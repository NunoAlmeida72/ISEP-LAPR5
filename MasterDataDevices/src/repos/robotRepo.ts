import { Service, Inject } from 'typedi';

import IRobotRepo from "../services/IRepos/IRobotRepo";
import { Robot } from "../domain/robot";
import { RobotId } from "../domain/robotId";
import { RobotMap } from "../mappers/RobotMap";

import { Document, FilterQuery, Model } from 'mongoose';
import { IRobotPersistence } from '../dataschema/IRobotPersistence';

@Service()
export default class RobotRepo implements IRobotRepo {
  private models: any;

  constructor(
    @Inject('robotSchema') private robotSchema : Model<IRobotPersistence & Document>,
  ) {}

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async exists(robot: Robot): Promise<boolean> {
    
    const idX = robot.id instanceof RobotId ? (<RobotId>robot.id).toValue() : robot.id;

    const query = { domainId: idX}; 
    const robotDocument = await this.robotSchema.findOne( query as FilterQuery<IRobotPersistence & Document>);

    return !!robotDocument === true;
  }

  public async save (robot: Robot): Promise<Robot> {
    const query = { domainId: robot.id.toString()}; 

    const robotDocument = await this.robotSchema.findOne( query );

    try {
      if (robotDocument === null ) {
        const rawRobot: any = RobotMap.toPersistence(robot);

        const robotCreated = await this.robotSchema.create(rawRobot);

        return RobotMap.toDomain(robotCreated);
      } else {
        robotDocument.name = robot.name;
        robotDocument.code = robot.code;
        robotDocument.robotTypeId = robot.robotTypeId;
        robotDocument.number = robot.number;
        robotDocument.status = robot.status;
        robotDocument.description= robot.description;
        await robotDocument.save();

        return robot;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByDomainId (robotId: RobotId | string): Promise<Robot> {
    const query = { domainId: robotId};
    const robotRecord = await this.robotSchema.findOne( query as FilterQuery<IRobotPersistence & Document> );

    if( robotRecord != null) {
      return RobotMap.toDomain(robotRecord);
    }
    else
      return null;
  }

  public async findAll(): Promise<Robot[]> {
      const robotResult = await this.robotSchema.find();
      const robots = []
      if(robotResult.length != 0){
        robotResult.forEach((element) => {
            robots.push(RobotMap.toDomain(element));
        })
      }
      return robots;
  }

  public async findNames(): Promise<string[]> {
    const robotResult = await this.robotSchema.find();
    const nameList = []
    if(robotResult.length != 0){
      robotResult.forEach((element) => {
        if(!nameList.includes(element.name)){
          nameList.push(element.name);
        }
      })
    }
    return nameList;
}

  public async findByName(designation: string): Promise<Robot[]> {
    const query = {name : designation};
    const robotResult = await this.robotSchema.find( query as FilterQuery<IRobotPersistence & Document>);
    const robots = []
    if(robotResult.length != 0){
      robotResult.forEach((element) => {
          robots.push(RobotMap.toDomain(element));
      })
    }
    return robots;
  }

  public async findByRobotTypeId(id: string): Promise<Robot[]> {
      const query={robotTypeId:id};

      const robotResult = await this.robotSchema.find( query as FilterQuery<IRobotPersistence & Document>);
      const robots = []
      if(robotResult.length != 0){
        robotResult.forEach((element) => {
          robots.push(RobotMap.toDomain(element));
        })
      }
      
      return robots;
  }
}