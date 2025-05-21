import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IBuildingController from '../../controllers/IControllers/IBuildingController'; 

import config from "../../../config";
import isAuth from '../middlewares/isAuth';

const route = Router();

export default (app: Router) => {
  app.use('/buildings', route);

  const ctrl = Container.get(config.controllers.building.name) as IBuildingController;

  route.post('',isAuth(["Admin","Campus Manager"]),
    celebrate({
      body: Joi.object({
        name: Joi.string(),
        code: Joi.string().required(),
        description: Joi.string(),
        width: Joi.number().required(),
        depth: Joi.number().required(),
      })
    }),
    (req, res, next) => ctrl.createBuilding(req, res, next) );

    route.get('',isAuth(["Admin","Campus Manager","User","Fleet Manager","Task Manager"]),(req,res,next) => ctrl.listBuildings(req,res,next));

    route.get('/inFloorLimit/:min/:max',isAuth(["Admin","Campus Manager","User","Fleet Manager","Task Manager"]),(req,res,next) => ctrl.listBuildingsInFloorLimit(req,res,next));

    route.put('',isAuth(["Admin","Campus Manager"]),celebrate({
      body:Joi.object({
        id: Joi.string().required(),
        name: Joi.string().required(),
        code: Joi.string().required(),
        description: Joi.string().required(),
        width: Joi.number().required(),
        depth: Joi.number().required(),
      })
    }),
    (req, res, next) => ctrl.updateBuilding(req, res, next) );

    route.patch('',isAuth(["Admin","Campus Manager"]),celebrate({
      body:Joi.object({
        id: Joi.string().required(),
        name: Joi.string(),
        code: Joi.string(),
        description: Joi.string(),
        width: Joi.number(),
        depth: Joi.number(),
      })
    }),
    (req, res, next) => ctrl.updateBuilding(req, res, next) );



};