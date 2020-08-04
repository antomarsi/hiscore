import { Response, Request, Router } from 'express'
import * as jwt from 'jsonwebtoken'
import IControllerBase from './IController'
import { getRepository } from 'typeorm'
import { User } from '../database/entity/User'
import passport from 'passport'
import app from 'app'

class AuthController extends IControllerBase {
  public static path: string = '/auth'

  public initRoutes() {
    // GITHUB auth
    this.router.get('/github', passport.authenticate('github'))
    this.router.get(
      '/github/callback',
      passport.authenticate('github', (req, res) => {
        res.redirect('/home')
      })
    )
    // GOOGLE auth
    this.router.get(
      '/google',
      passport.authenticate('google', { scope: ['profile', 'email'] })
    )
    this.router.get(
      '/google/callback',
      passport.authenticate('google', (req, res) => {
        res.redirect('/home')
      })
    )

    this.router.get('/user')

    app.get('/logout', (req, res) => {
      console.log('loginout')
      req.logout()
      res.redirect('/')
    })
  }
}

export default AuthController
