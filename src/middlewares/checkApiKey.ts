import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

const { JWT_SECRET } = process.env;

export const checkApiKey = (req: Request, res: Response, next: NextFunction) => {
  //Get the jwt token from the head
  const token = <string>req.headers['api-key'];
  let jwtPayload;

  //Try to validate the token and get data
  try {
    jwtPayload = <any>jwt.verify(token, JWT_SECRET);
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    //If token is not valid, respond with 401 (unauthorized)
    res.status(401).send();
    return;
  }
  //Call the next middleware or controller
  next();
};
