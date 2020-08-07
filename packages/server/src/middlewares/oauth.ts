import { Request, Response, NextFunction } from 'express'
import axios from 'axios'
import { getCustomRepository } from 'typeorm'

import { clientGithubOAuth, clientGoogleOAuth } from '../config/oauth'
import HttpException from '../exceptions/httpException'
import { UserRepository } from '../database/repository/UserRepository'
import { SOCIAL_PROVIDER_TYPE } from '../database/entity/SocialProvider'
import { GOOGLE, GITHUB } from '../config/auth'

export const githubAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.query.code === undefined) {
      throw Error('invalid Token')
    }
    const {
      token: { error, access_token }
    } = await clientGithubOAuth.getToken({
      code: req.query.code.toString(),
      scope: 'read:user',
      redirect_uri: GITHUB.callbackURL
    })
    if (error) {
      throw new Error(error)
    }
    const { data } = await axios.get('https://api.github.com/user', {
      headers: { Authorization: `token ${access_token}` }
    })
    const user = await getCustomRepository(UserRepository).upsertUser(
      access_token,
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
    console.error(err)
    next(new HttpException(400, 'Error on Authentication'))
  }
}

export const googleAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.query.code === undefined) {
      throw Error('invalid Token')
    }
    const value = await clientGoogleOAuth.getToken({
      code: req.query.code.toString(),
      redirect_uri: GOOGLE.callbackURL
    })
    const { data } = await axios.get('https://api.github.com/user', {
      headers: { Authorization: `token ${value.token.access_token}` }
    })
    const user = getCustomRepository(UserRepository).upsertUser(
      value.token.access_token,
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
    next(new HttpException(400, 'Error on Authentication'))
  }
}
