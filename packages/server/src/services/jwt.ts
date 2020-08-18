import { Request, Response, NextFunction } from 'express'
import { getRepository } from 'typeorm'

import auth from './auth'
import { User } from 'src/entities/user'
import { sign } from 'jsonwebtoken'

export const createToken = (user: User) => {
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

export const sendToken = (req: Request, res: Response, next: NextFunction) => {
  res.header("x-auth-token", req.token!);
  next()
}

export const checkToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

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
