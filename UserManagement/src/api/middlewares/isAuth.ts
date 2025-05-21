// remove by JRT : import jwt from 'express-jwt';
var { expressjwt: jwt } = require("express-jwt");
import config from '../../../config';

/**
 * We are assuming that the JWT will come in a header with the form
 *
 * Authorization: Bearer ${JWT}
 *
 * But it could come in a query parameter with the name that you want like
 * GET https://my-bulletproof-api.com/stats?apiKey=${JWT}
 * Luckily this API follow _common sense_ ergo a _good design_ and don't allow that ugly stuff
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

  

const isAuth=(requiredRoles)=>(req, res, next) => {
  try {
    let token=getTokenFromHeader(req);
    let userRole;
    jwt.verify(token,config.jwtSecret, function(err, decoded){
    if (err){return null};
    userRole=decoded.role;
    })

    if (!requiredRoles.includes(userRole)) {
      return res.status(403).json({ message: 'Forbidden - Insufficient role' });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: 'Insuficient Permissions' });
  }
};

export default isAuth;
