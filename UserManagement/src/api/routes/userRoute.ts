import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';

import middlewares from '../middlewares';
import { celebrate, Joi } from 'celebrate';
import IUserController from '../../controllers/IControllers/IUserController';

import config from "../../../config";
import isAuth from '../middlewares/isAuth';
import attachCurrentUser from '../middlewares/attachCurrentUser';

const route = Router();

export default (app: Router) => {
  app.use('/auth', route);

  const ctrl = Container.get(config.controllers.user.name) as IUserController;

  route.get('/get/waiting/decision/users',isAuth(["Admin"]),(req, res, next) => ctrl.getUsersRequest(req, res, next));

  route.patch("/users/accept-registration/:id",isAuth(["Admin"]),(req, res, next) => ctrl.acceptUser(req, res, next));
  
  route.patch("/users/reject-registration/:id",isAuth(["Admin"]),(req, res, next) => ctrl.rejectUser(req, res, next))

  route.get('/get/user/:id',(req, res, next) => ctrl.getUserById(req, res, next));
  
  route.get('/users/roles/:role',(req, res, next) => ctrl.getUsersByRole(req, res, next));

  route.post('/users/create',isAuth(["Admin"]),
  celebrate({
    body: Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
      role: Joi.string().required(),
      phoneNumber:Joi.number().required()
    }),
  }),
  (req, res, next) => ctrl.createUser(req, res, next));

  route.post(
    '/signup',
    celebrate({
      body: Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
        phoneNumber:Joi.number().required(),
        nif:Joi.number().required()
      }),
    }),
    (req, res, next) => ctrl.signUp(req, res, next) 
  );

  route.post(
    '/signin',
    celebrate({
      body: Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
      }),
    }),
    (req, res, next) => ctrl.signIn(req, res, next) );

  /**
   * @TODO Let's leave this as a place holder for now
   * The reason for a logout route could be deleting a 'push notification token'
   * so the device stops receiving push notifications after logout.
   *
   * Another use case for advance/enterprise apps, you can store a record of the jwt token
   * emitted for the session and add it to a black list.
   * It's really annoying to develop that but if you had to, please use Redis as your data store
   */
  route.post('/logout', (req, res, next) => ctrl.logout(req, res, next));

  route.get('/all/users', (req, res, next) => ctrl.getUsers(req, res, next));

  route.get('/me',attachCurrentUser, (req, res, next) => ctrl.getMe(req, res, next));

  route.delete('/delete/account/me',attachCurrentUser, (req, res, next) => ctrl.deleteMe(req, res, next));

  route.put(
    '/updateUser',
    celebrate({
      body: Joi.object({
        id: Joi.string().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
        phoneNumber:Joi.number().required(),
        nif:Joi.number().required()
      }),
    }),
    (req, res, next) => ctrl.updateUser(req, res, next) 
  );

  route.patch(
    '/updateUser',
    celebrate({
      body: Joi.object({
        id: Joi.string().required(),
        firstName: Joi.string(),
        lastName: Joi.string(),
        email: Joi.string(),
        password: Joi.string(),
        phoneNumber: Joi.number(),
        nif: Joi.number()
      }),
    }),
    (req, res, next) => ctrl.updateUser(req, res, next) 
  );
};
