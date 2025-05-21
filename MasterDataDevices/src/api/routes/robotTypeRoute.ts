import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IRobotTypeController from '../../controllers/IControllers/IRobotTypeController'; 

import config from "../../../config";
import middlewares from '../middlewares';
import isAuth from '../middlewares/isAuth';

const route = Router();

export default (app: Router) => {
  app.use('/robotTypes', route);

  const ctrl = Container.get(config.controllers.robotType.name) as IRobotTypeController;

  route.post('',isAuth(["Admin","Fleet Manager"]),
    celebrate({
      body: Joi.object({
        type: Joi.string().required(),
        brand: Joi.string().required(),
        model: Joi.string().required(),
        possibleTasks: Joi.array().items(Joi.string()).required(),
      })
    }),
    (req, res, next) => ctrl.createRobotType(req, res, next) );

  route.get('',isAuth(["Admin","Campus Manager","User","Fleet Manager","Task Manager"]), (req,res,next) => ctrl.listRobotTypes(req,res,next));

};