import { OAuth2Strategy } from 'passport-google-oauth'
import { getRepository, getCustomRepository } from 'typeorm'
import { GOOGLE, GITHUB } from './auth'
import { Strategy as GithubStrategy } from 'passport-github'
import { Strategy as BearerStrategy } from 'passport-http-bearer'
import { Game } from '../database/entity/Game'
import { UserRepository } from './../database/repository/UserRepository'
import { checkJwt } from './../middlewares/jwt'

export const googleStrategy = new OAuth2Strategy(
  {
    clientID: GOOGLE.clientId!,
    clientSecret: GOOGLE.clientSecret!,
    callbackURL: GOOGLE.callbackURL
  },
  (accessToken, refreshToken, profile, done) => {
    getCustomRepository(UserRepository)
      .upsertGoogleUser(accessToken, refreshToken, profile)
      .then(user => done(null, user))
      .catch(err => done(err))
  }
)

export const githubStrategy = new GithubStrategy(
  {
    clientID: GITHUB.clientId!,
    clientSecret: GITHUB.clientSecret!
  },
  (accessToken, refreshToken, profile, done) => {
    getCustomRepository(UserRepository)
      .upsertGithubUser(accessToken, refreshToken, profile)
      .then(user => done(null, user))
      .catch(err => done(err))
  }
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
