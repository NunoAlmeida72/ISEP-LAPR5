import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IBuildingConnectionController from '../../controllers/IControllers/IBuildingConnectionController'; 

import config from "../../../config";
import isAuth from '../middlewares/isAuth';

const route = Router();

export default (app: Router) => {
  app.use('/buildingConnections', route);

  const ctrl = Container.get(config.controllers.buildingConnection.name) as IBuildingConnectionController;

  route.post('',isAuth(["Admin","Campus Manager"]),
    celebrate({
      body: Joi.object({
        floor1Id: Joi.string().required(),
        floor2Id: Joi.string().required()
      })
    }),
    (req, res, next) => ctrl.createBuildingConnection(req, res, next) );

    route.get('/:id1/:id2',isAuth(["Admin","Campus Manager","User","Fleet Manager","Task Manager"]),(req,res,next) => ctrl.listBuildingConnections(req,res,next));

    route.get('/:id',isAuth(["Admin","Campus Manager","User","Fleet Manager","Task Manager"]),(req,res,next) => ctrl.getBuildingConnectionsByFloorId(req,res,next));

    route.put('',isAuth(["Admin","Campus Manager"]),celebrate({
      body:Joi.object({
        id: Joi.string().required(),
        floor1Id: Joi.string().required(),
        floor2Id: Joi.string().required()
      })
    }),
    (req, res, next) => ctrl.updateBuildingConnection(req, res, next) );

    route.patch('',isAuth(["Admin","Campus Manager"]),celebrate({
      body:Joi.object({
        id: Joi.string().required(),
        floor1Id: Joi.string(),
        floor2Id: Joi.string(),
      })
    }),
    (req, res, next) => ctrl.updateBuildingConnection(req, res, next) );
};