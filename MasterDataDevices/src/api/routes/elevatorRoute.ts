import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';

import config from '../../../config';
import IElevatorController from '../../controllers/IControllers/IElevatorController';
import isAuth from '../middlewares/isAuth';

const route = Router();

export default (app: Router) => {
    app.use('/elevators', route);

    const ctrl = Container.get(config.controllers.elevator.name) as IElevatorController;

    route.post('',isAuth(["Admin","Campus Manager"]), 
        celebrate({
            body: Joi.object({
                code: Joi.string().required(),
                brand: Joi.string(),
                model: Joi.string(),
                serialNumber: Joi.string(),
                description: Joi.string(),
                buildingId: Joi.string().required(),
                floorsIds: Joi.array().items(Joi.string()).required()
                })
            }),
            (req, res, next) => ctrl.createElevator(req, res, next)
    );    

    route.put('',isAuth(["Admin","Campus Manager"]), celebrate({
        body: Joi.object({
            id: Joi.string().required(),
            floorsIds: Joi.array().items(Joi.string()).required(),
            code: Joi.string().required(),
            brand: Joi.string().required(),
            model: Joi.string().required(),
            serialNumber: Joi.string().required(),
            description: Joi.string().required(),
        })
        }),
        (req, res, next) => ctrl.updateElevator(req, res, next)
    )

    route.patch('',isAuth(["Admin","Campus Manager"]), celebrate({
        body: Joi.object({
            id: Joi.string().required(),
            floorsIds: Joi.array().items(Joi.string()),
            code: Joi.string(),
            brand: Joi.string(),
            model: Joi.string(),
            serialNumber: Joi.string(),
            description: Joi.string(),
        })
        }),
        (req, res, next) => ctrl.updateElevator(req, res, next)
    )
    
    route.get('/building/:buildingId',isAuth(["Admin","Campus Manager","User","Fleet Manager","Task Manager"]), (req, res, next) => ctrl.listElevators(req, res, next));
}
