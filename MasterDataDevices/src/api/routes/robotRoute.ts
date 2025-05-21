import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IRobotController from '../../controllers/IControllers/IRobotController'; 

import config from "../../../config";
import middlewares from '../middlewares';
import isAuth from '../middlewares/isAuth';

const route = Router();

export default (app: Router) => {
  app.use('/robots', route);

  const ctrl = Container.get(config.controllers.robot.name) as IRobotController;

  route.post('',isAuth(["Admin","Fleet Manager"]),
    celebrate({
      body: Joi.object({
        code: Joi.string().required(),
        name: Joi.string().required(),
        robotTypeId: Joi.string().required(),
        number: Joi.string().required(),
        description: Joi.string(),
      })
    }),
    (req, res, next) => ctrl.createRobot(req, res, next) );

  route.patch('/disable',isAuth(["Admin","Fleet Manager"]),
    celebrate({
      body: Joi.object({
        id: Joi.string().required()
      })
    }),
    (req, res, next) => ctrl.disableRobot(req, res, next) );

  route.get('',isAuth(["Admin","Campus Manager","User","Fleet Manager","Task Manager"]), (req,res,next) => ctrl.listRobots(req,res,next));

  route.get('/robotType/:id',isAuth(["Admin","Campus Manager","User","Fleet Manager","Task Manager"]),(req,res,next)=>ctrl.listRobotsByRobotType(req,res,next));

  route.get('/taskOrDesignation/:TaskOrDesignation',isAuth(["Admin","Campus Manager","User","Fleet Manager","Task Manager"]), (req, res, next) => ctrl.listRobotsByTaskOrDesignation(req, res, next));
  
  route.get('/designation',isAuth(["Admin","Campus Manager","User","Fleet Manager","Task Manager"]), (req, res, next) => ctrl.listRobotNames(req, res, next));

  }