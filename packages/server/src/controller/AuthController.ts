import { Response, Request } from 'express'
import { classToPlain } from 'class-transformer'

import IControllerBase from './IController'
import { generateToken, sendToken, checkToken } from '../middlewares/jwt'
import { githubAuthMiddleware, googleAuthMiddleware } from '../middlewares/oauth'

class AuthController extends IControllerBase {
  public static path: string = '/auth'

  public initRoutes() {
    // GITHUB auth
    this.router.get(
      '/github',
      githubAuthMiddleware,
      generateToken,
      sendToken,
      (req: Request, res: Response) => {
        return res
          .status(200)
          .json({ token: req.token!, user: classToPlain(req.user) })
      }
    )

    // GOOGLE auth
    this.router.get(
      '/google',
      googleAuthMiddleware,
      generateToken,
      sendToken,
      (req: Request, res: Response) => {
        return res
          .status(200)
          .json({ token: req.token!, user: classToPlain(req.user) })
      }
    )

    this.router.get(
      '/me',
      checkToken,
      generateToken,
      sendToken,
      (req: Request, res: Response) => {
        return res
          .status(200)
          .json({ token: req.token!, user: classToPlain(req.user) })
      }
    )
  }
}

export default AuthController
