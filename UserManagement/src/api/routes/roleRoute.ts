import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import middlewares from '../middlewares';

import { Container } from 'typedi';
import IRoleController from '../../controllers/IControllers/IRoleController'; 

import config from "../../../config";
import isAuth from '../middlewares/isAuth';

const route = Router();

export default (app: Router) => {
  app.use('/roles', route);

  const ctrl = Container.get(config.controllers.role.name) as IRoleController;

  route.post('',isAuth(["Admin"]),
    celebrate({
      body: Joi.object({
        name: Joi.string().required()
      })
    }),
    (req, res, next) => ctrl.createRole(req, res, next) );

  route.put('',isAuth(["Admin"]),
    celebrate({
      body: Joi.object({
        id: Joi.string().required(),
        name: Joi.string().required()
      }),
    }),
    (req, res, next) => ctrl.updateRole(req, res, next) );

    route.get('', isAuth(['Admin']),(req, res, next) => ctrl.getRoles(req, res, next));

    route.get('/get/non-user', isAuth(['Admin']),(req, res, next) => ctrl.getNonUserRoles(req, res, next));

    route.get('/:id',isAuth(["Admin"]), (req, res, next) => ctrl.getRole(req, res, next));
};