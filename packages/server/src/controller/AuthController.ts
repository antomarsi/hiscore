import { Response, Request, NextFunction } from 'express'
import IControllerBase from './IController'
import passport from 'passport'
import { generateToken, sendToken } from './../middlewares/jwt'
import { classToPlain } from 'class-transformer'
import { githubAuthMiddleware, googleAuthMiddleware } from './../middlewares/oauth';

class AuthController extends IControllerBase {
  public static path: string = '/auth'

  public initRoutes() {
    // GITHUB auth
    this.router.get(
      '/github',
      githubAuthMiddleware,
      generateToken,
      sendToken,
      (req, res) => {
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
