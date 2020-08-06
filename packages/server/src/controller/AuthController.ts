import { Response, Request, Router, NextFunction } from 'express'
import IControllerBase from './IController'
import { User } from '../database/entity/User'
import passport from 'passport'
import { generateToken, sendToken } from './../middlewares/jwt'
import { classToPlain } from 'class-transformer'

class AuthController extends IControllerBase {
  public static path: string = '/auth'

  public initRoutes() {
    // GITHUB auth

    this.router.get(
      '/github',
      passport.authenticate('github', { session: false }),
      generateToken,
      sendToken,
      (req, res) => {
        return res
          .status(200)
          .json({ token: req.token!, user: classToPlain(req.user) })
      }
    )

    /*this.router.get(
      '/github',
      passport.authenticate('github', {
        session: false
      }),
      (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
          return res.status(401).send('User Not Authenticated')
        }
        req.authInfo = { id: (req.user as User).id }
        next()
      },
      generateToken,
      sendToken
    )*/

    // GOOGLE auth
    this.router.get(
      '/google',
      passport.authenticate('google', {
        session: false
      }),
      generateToken,
      sendToken,
      (req, res) => {
        return res
          .status(200)
          .json({ token: req.token!, user: classToPlain(req.user) })
      }
    )

    this.router.get(
      '/me',
      passport.authenticate('user-jwt'),
      generateToken,
      sendToken,
      (req, res) => {
        return res
          .status(200)
          .json({ token: req.token!, user: classToPlain(req.user) })
      }
    )
    /*
    this.router.get('/logout', (req, res) => {
      console.log('loginout')
      req.logout()
      res.redirect('/')
    })
    */
  }
}

export default AuthController
