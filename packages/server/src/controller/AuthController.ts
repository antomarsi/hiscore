import { Response, Request, Router, NextFunction } from 'express'
import IControllerBase from './IController'
import { User } from '../database/entity/User'
import passport from 'passport'
import { generateToken, sendToken } from './../middlewares/jwt'

class AuthController extends IControllerBase {
  public static path: string = '/auth'

  public initRoutes() {
    // GITHUB auth
    this.router.get(
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
    )
    /*
    this.router.get(
      '/github/callback',
      passport.authenticate('github', (req, res) => {
        res.redirect('/home')
      })
    )
    */
    // GOOGLE auth
    this.router.get(
      '/google',
      passport.authenticate('google', {
        scope: ['profile', 'email'],
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
    )
    /*
    this.router.get(
      '/google/callback',
      passport.authenticate('google', { failureRedirect: '/' }),
      (req: Request, res: Response) => {
        res.redirect('/home')
      }
    )
    */

    this.router.get('/user', passport.authenticate('user-jwt'))
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
