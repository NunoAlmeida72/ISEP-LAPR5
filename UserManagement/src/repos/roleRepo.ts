import { Service, Inject } from 'typedi';

import IRoleRepo from "../services/IRepos/IRoleRepo";
import { Role } from "../domain/role";
import { RoleId } from "../domain/roleId";
import { RoleMap } from "../mappers/RoleMap";

import { Document, FilterQuery, Model } from 'mongoose';
import { IRolePersistence } from '../dataschema/IRolePersistence';

@Service()
export default class RoleRepo implements IRoleRepo {
  private models: any;

  constructor(
    @Inject('roleSchema') private roleSchema : Model<IRolePersistence & Document>,
  ) {}

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async exists(role: Role): Promise<boolean> {
    
    const idX = role.id instanceof RoleId ? (<RoleId>role.id).toValue() : role.id;

    const query = { domainId: idX}; 
    const roleDocument = await this.roleSchema.findOne( query as FilterQuery<IRolePersistence & Document>);

    return !!roleDocument === true;
  }

  public async findByName(roleName: string): Promise<Role> {
      const query={name: roleName};
      const roleRecord= await this.roleSchema.findOne( query as FilterQuery<IRolePersistence & Document>);

      if( roleRecord != null) {
        return RoleMap.toDomain(roleRecord);
      }
      else
        return null;
  }

  public async save (role: Role): Promise<Role> {
    const query = { domainId: role.id.toString()}; 

    const roleDocument = await this.roleSchema.findOne( query );

    try {
      if (roleDocument === null ) {
        const rawRole: any = RoleMap.toPersistence(role);

        const roleCreated = await this.roleSchema.create(rawRole);

        return RoleMap.toDomain(roleCreated);
      } else {
        roleDocument.name = role.name;
        await roleDocument.save();

        return role;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByDomainId (roleId: RoleId | string): Promise<Role> {
    const query = { domainId: roleId};
    const roleRecord = await this.roleSchema.findOne( query as FilterQuery<IRolePersistence & Document> );

    if( roleRecord != null) {
      return RoleMap.toDomain(roleRecord);
    }
    else
      return null;
  }


  public async findAll (): Promise<Role[]> {
    const roleResult = await this.roleSchema.find();
    const roles=[]
    if(roleResult.length != 0){
      roleResult.forEach((element) => {
        roles.push(RoleMap.toDomain(element));
      })
    }
    return roles;
  }
}