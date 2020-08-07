import { clientGithubOAuth, clientGoogleOAuth } from './../config/oauth'
import HttpException from './../exceptions/HttpException'
import { Request, Response, NextFunction } from 'express'
import { getCustomRepository } from 'typeorm'
import { UserRepository } from './../database/repository/UserRepository'
import axios from 'axios'
import { SOCIAL_PROVIDER_TYPE } from './../database/entity/SocialProvider'

export const githubAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      token: { error, access_token }
    } = await clientGithubOAuth.getToken({
      code: req.query.code,
      scope: 'read:user'
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
    next(new HttpException(400, 'Error on Authentication'))
  }
}

export const googleAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const value = await clientGoogleOAuth.getToken({
      code: req.query.code
    })
    if (value.error) {
      throw new Error(value.error)
    }
    const { data } = await axios.get('https://api.github.com/user', {
      headers: { Authorization: `token ${value.access_token}` }
    })
    const user = getCustomRepository(UserRepository).upsertUser(
      value.access_token,
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
