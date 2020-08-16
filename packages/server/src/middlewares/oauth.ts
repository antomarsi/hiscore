import { Request, Response, NextFunction } from 'express'
import axios from 'axios'

import { clientGithubOAuth, clientGoogleOAuth } from '../config/oauth'
import HttpException from '../exceptions/httpException'
import { SOCIAL_PROVIDER_TYPE } from '../database/entity/SocialProvider'
import { GOOGLE, GITHUB } from '../config/auth'
import { InvalidTokenException } from './../exceptions/tokenExceptions'
import { User } from './../database/entity/User'

export const githubAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.query.code === undefined) {
      throw new InvalidTokenException()
    }
    const {
      token: { error, access_token }
    } = await clientGithubOAuth.getToken({
      code: req.query.code.toString(),
      scope: 'read:user',
      redirect_uri: GITHUB.callbackURL
    })
    if (error) {
      throw new HttpException(400, error)
    }
    const { data } = await axios.get('https://api.github.com/user', {
      headers: { Authorization: `token ${access_token}` }
    })
    const user = await User.upsertUser(
      {
        id: data.id,
        displayName: data.name,
        email: data.email
      },
      SOCIAL_PROVIDER_TYPE.GITHUB
    )
    req.user = user
    next(null)
  } catch (err) {
    next(err)
  }
}

export const googleAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.query.code === undefined) {
      throw new InvalidTokenException()
    }
    const value = await clientGoogleOAuth.getToken({
      code: req.query.code.toString(),
      redirect_uri: GOOGLE.callbackURL
    })
    const { data } = await axios.get('https://api.github.com/user', {
      headers: { Authorization: `token ${value.token.access_token}` }
    })
    const user = await User.upsertUser(
      {
        id: data.id,
        displayName: data.name,
        email: data.email
      },
      SOCIAL_PROVIDER_TYPE.GITHUB
    )
    req.user = user
    next(null)
  } catch (err) {
    next(err)
  }
}
