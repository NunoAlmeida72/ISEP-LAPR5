import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import ITaskController from '../../controllers/IControllers/ITaskController'; 

import config from "../../../config";
import isAuth from '../middlewares/isAuth';

const route = Router();

export default (app: Router) => {
  app.use('/robot-type-tasks', route);

  const ctrl = Container.get(config.controllers.task.name) as ITaskController;

  route.post('',isAuth(["Admin","Fleet Manager"]),
    celebrate({
      body: Joi.object({
        name: Joi.string().required()
      })
    }),
    (req, res, next) => ctrl.createTask(req, res, next) );

    route.get('',isAuth(["Admin","Campus Manager","User","Fleet Manager","Task Manager"]), (req, res, next) => ctrl.getTasks(req, res, next));

    route.get('/:id',isAuth(["Admin","Campus Manager","User","Fleet Manager","Task Manager"]), (req, res, next) => ctrl.getTask(req, res, next));
};