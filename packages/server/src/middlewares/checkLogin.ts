import { Request, Response, NextFunction } from 'express'

export const checkLogin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //Get the jwt token from the head
  if (req.isAuthenticated()) {
    next()
  } else {
    res.sendStatus(401)
  }
}
