import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import IRoleController from "./IControllers/IRoleController";
import IRoleService from '../services/IServices/IRoleService';
import IRoleDTO from '../dto/IRoleDTO';

import { Result } from "../core/logic/Result";
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

@Service()
export default class RoleController implements IRoleController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
      @Inject(config.services.role.name) private roleServiceInstance : IRoleService
  ) {}

  public async createRole(req: Request, res: Response, next: NextFunction) {
    try {
      const roleOrError = await this.roleServiceInstance.createRole(req.body as IRoleDTO) as Result<IRoleDTO>;
        
      if (roleOrError.isFailure) {
        return res.status(402).json(roleOrError.errorValue()).send();
      }

      const roleDTO = roleOrError.getValue();
      return res.json( roleDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

  public async updateRole(req: Request, res: Response, next: NextFunction) {
    try {
      const roleOrError = await this.roleServiceInstance.updateRole(req.body as IRoleDTO) as Result<IRoleDTO>;

      if (roleOrError.isFailure) {
        return res.status(404).json(roleOrError.errorValue()).send();
      }

      const roleDTO = roleOrError.getValue();
      return res.status(201).json( roleDTO );
    }
    catch (e) {
      return next(e);
    }
  }
  
  public async getRoles(req: Request, res: Response, next: NextFunction) {
    try {
      const roleOrError = await this.roleServiceInstance.getRoles() as Result<IRoleDTO[]>;

      if (roleOrError.isFailure) {
        return res.status(404).json(roleOrError.errorValue()).send();
      }

      const roleDTO = roleOrError.getValue();
      return res.status(201).json( roleDTO );
    }
    catch (e) {
      return next(e);
    }
  }

  public async getRole(req: Request, res: Response, next: NextFunction) {
    try {
      let aux=req.params.id;
      const roleOrError = await this.roleServiceInstance.getRole(aux) as Result<IRoleDTO>;

      if (roleOrError.isFailure) {
        return res.status(404).json(roleOrError.errorValue()).send();
      }

      const roleDTO = roleOrError.getValue();
      return res.status(201).json( roleDTO );
    }
    catch (e) {
      return next(e);
    }
  }

  public async getNonUserRoles(req: Request, res: Response, next: NextFunction) {
    try {
      const roleOrError = await this.roleServiceInstance.getNonUserRoles() as Result<IRoleDTO[]>;

      if (roleOrError.isFailure) {
        return res.status(404).json(roleOrError.errorValue()).send();
      }

      const roleDTO = roleOrError.getValue();
      return res.status(201).json( roleDTO );
    }
    catch (e) {
      return next(e);
    }
  }
  

}