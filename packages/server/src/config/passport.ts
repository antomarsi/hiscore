import { OAuth2Strategy, VerifyFunction } from 'passport-google-oauth'
import { getRepository, getCustomRepository } from 'typeorm'
import { GOOGLE, GITHUB } from './auth'
import { Strategy as GithubStrategy } from 'passport-github2'
import { Strategy as BearerStrategy } from 'passport-http-bearer'
import { VerifyCallback } from 'passport-oauth2'
import { Game } from '../database/entity/Game'
import { UserRepository } from './../database/repository/UserRepository'
import { checkJwt } from './../middlewares/jwt'
import { SOCIAL_PROVIDER_TYPE } from './../database/entity/SocialProvider'

export const googleStrategy = new OAuth2Strategy(
  {
    clientID: GOOGLE.clientId!,
    clientSecret: GOOGLE.clientSecret!,
    callbackURL: GOOGLE.callbackURL
  },
  (
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyFunction
  ) =>
    getCustomRepository(UserRepository)
      .upsertUser(
        accessToken,
        refreshToken,
        profile,
        SOCIAL_PROVIDER_TYPE.GOOGLE
      )
      .then(user => done(null, user))
      .catch(err => done(err))
)

export const githubStrategy = new GithubStrategy(
  {
    clientID: GITHUB.clientId,
    clientSecret: GITHUB.clientSecret,
    callbackURL: 'http://localhost:3334/login/github/success'
  },
  (
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback
  ) =>
    getCustomRepository(UserRepository)
      .upsertUser(
        accessToken,
        refreshToken,
        profile,
        SOCIAL_PROVIDER_TYPE.GITHUB
      )
      .then(user => done(null, user))
      .catch(err => done(err))
)

export const bearerUserStrategy = new BearerStrategy((token, done) => {
  checkJwt(token)
    .then(user => done(null, user))
    .catch(err => done(err))
})

export const bearerGameStrategy = new BearerStrategy((token, done) => {
  getRepository(Game)
    .findOneOrFail({ apiKey: token })
    .then(game => done(null, game))
    .catch(err => done(err))
})
