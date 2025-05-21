import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IRoomController from '../../controllers/IControllers/IRoomController'; 

import config from "../../../config";
import isAuth from '../middlewares/isAuth';

const route = Router();

export default (app: Router) => {
  app.use('/rooms', route);

  const ctrl = Container.get(config.controllers.room.name) as IRoomController;

  route.post('',isAuth(["Admin","Campus Manager"]),
    celebrate({
      body: Joi.object({
        floorId: Joi.string().required(),
        name: Joi.string().required(),
        category: Joi.string().required(),
        description: Joi.string().required(),
      })
    }),
    (req, res, next) => ctrl.createRoom(req, res, next));

    route.get('/:id',isAuth(["Admin","Campus Manager","User","Fleet Manager","Task Manager"]),(req,res,next) => ctrl.listRoomsByFloorId(req,res,next));

    route.get('',isAuth(["Admin","Campus Manager","User","Fleet Manager","Task Manager"]),(req,res,next) => ctrl.listRooms(req,res,next));

    
};