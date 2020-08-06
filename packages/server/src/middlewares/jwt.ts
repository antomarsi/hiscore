import { Request, Response, NextFunction } from 'express'
import { User } from './../database/entity/User'
import { sign, verify } from 'jsonwebtoken'
import { getRepository } from 'typeorm'
import auth from './../config/auth'

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

export const sendToken = (req: Request, res: Response) => {
  return res.status(200).json({ token: req.token!, user: req.user })
}

export const checkJwt = (token: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    if (!token) {
      return reject('Invalid Token')
    }
    let jwtPayload = <any>verify(token, auth.secret)
    return getRepository(User)
      .findOneOrFail(jwtPayload.id)
      .then(user => resolve(user))
      .catch(err => 'Invalid Token')
  })
}
