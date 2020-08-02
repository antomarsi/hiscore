import { Request, Response, NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'
import auth from '../config/auth'
import { getRepository } from 'typeorm'
import { User } from './../database/entity/User'

export const checkJwt = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //Get the jwt token from the head
  const authHeader = req.headers.authorization
  let jwtPayload
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)
  //Try to validate the token and get data

  try {
    jwtPayload = <any>jwt.verify(token, auth.secret)
    res.locals.jwtPayload.user = await getRepository(User).findOneOrFail(
      jwtPayload.userId
    )
  } catch (error) {
    //If token is not valid, respond with 401 (unauthorized)
    return res.status(401).json()
  }

  //The token is valid for 1 hour
  //We want to send a new token on every request
  const { userId, username } = jwtPayload
  const newToken = jwt.sign({ userId, username }, auth.secret, {
    expiresIn: auth.expiresIn
  })
  res.setHeader('token', newToken)

  //Call the next middleware or controller
  next()
}
