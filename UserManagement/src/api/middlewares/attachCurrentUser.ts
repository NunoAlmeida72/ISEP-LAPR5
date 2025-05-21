import { Container} from 'typedi';

import winston from 'winston';

import config from '../../../config';

import IUserRepo from '../../services/IRepos/IUserRepo';

/**
 * Attach user to req.user
 * @param {*} req Express req Object
 * @param {*} res  Express res Object
 * @param {*} next  Express next Function
 */

var jwt = require('jsonwebtoken');
const getTokenFromHeader = req => {
  /**
   * @TODO Edge and Internet Explorer do some weird things with the headers
   * So I believe that this should handle more 'edge' cases ;)
   */
  if (
    (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token') ||
    (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
  ) {
    return req.headers.authorization.split(' ')[1];
  }
  return null;
};

const attachCurrentUser = async (req, res, next) => {
  const Logger = Container.get('logger') as winston.Logger;
  try {
    
    const userRepo = Container.get(config.repos.user.name) as IUserRepo

    let token=getTokenFromHeader(req);
    let userId;
    jwt.verify(token,config.jwtSecret, function(err, decoded){
    if (err){return null};
    userId=decoded.id;
    })

    const id = userId;

    const isFound = await userRepo.exists( id );

    if (isFound){
      req.param.id=id;
      next();
    }
    else
      next( new Error("Token não corresponde a qualquer utilizador do sistema") );
  } catch (e) {
    Logger.error('🔥 Error attaching user to req: %o', e);
    return next(e);
  }
};

export default attachCurrentUser;
