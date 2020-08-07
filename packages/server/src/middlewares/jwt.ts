import { Request, Response, NextFunction } from 'express'
import { sign, verify } from 'jsonwebtoken'
import { getRepository } from 'typeorm'

import { User } from '../database/entity'
import auth from '../config/auth'
import { InvalidTokenException } from '../exceptions/tokenExceptions'

const createToken = (user: User) => {
  return sign(
    {
      id: user.id
    },
    auth.secret,
    {
      expiresIn: auth.expiresIn
    }
  )
}

export const generateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.token = createToken(req.user as User)
  return next()
}

export const sendToken = (req: Request, res: Response, next: NextFunction) => {
  res.setHeader('X-Auth-Token', req.token!)
  next()
}

export const checkToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.authorization) {
    return next(new InvalidTokenException())
  }
  const authorization = req.headers.authorization.split(' ')
  if (authorization.length !== 2) {
    return next(new InvalidTokenException())
  }
  try {
    let jwtPayload = <any>verify(authorization[1], auth.secret)
    req.user = await getRepository(User).findOneOrFail(jwtPayload.id)
    next(null)
  } catch (err) {
    next(new InvalidTokenException())
  }
}
