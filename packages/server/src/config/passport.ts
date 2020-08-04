import { OAuth2Strategy } from 'passport-google-oauth'
import { getRepository } from 'typeorm'
import { GOOGLE, GITHUB } from './auth'
import { Strategy as GithubStrategy } from 'passport-github'
import { Strategy as BearerStrategy } from 'passport-http-bearer'
import { User } from '../database/entity/User'
import { Game } from '../database/entity/Game'

export const googleStrategy = new OAuth2Strategy(
  {
    clientID: GOOGLE.clientId!,
    clientSecret: GOOGLE.clientSecret!,
    callbackURL: process.env.APP_URL + '/api/v1/auth/google/callback'
  },
  (accessToken, refreshToken, profile, done) => {
    const userRepository = getRepository(User)

    return userRepository
      .findOneOrFail({ googleId: profile.id })
      .then(user => {
        return done(null, user)
      })
      .catch(err => {
        let user = new User()
        user.googleId = profile.id
        userRepository.save(user).then(user => {
          return done(null, user)
        })
      })
  }
)

export const githubStrategy = new GithubStrategy(
  {
    clientID: GITHUB.clientId!,
    clientSecret: GITHUB.clientSecret!,
    callbackURL: process.env.APP_URL + '/api/v1/auth/github/callback'
  },
  (accessToken, refreshToken, profile, done) => {
    const userRepository = getRepository(User)

    return userRepository
      .findOneOrFail({ googleId: profile.id })
      .then(user => {
        return done(null, user)
      })
      .catch(err => {
        let user = new User()
        user.githubId = profile.id
        userRepository.save(user).then(user => {
          return done(null, user)
        })
      })
  }
)

export const bearerGameStrategy = new BearerStrategy(function (token, done) {
  getRepository(Game)
    .findOneOrFail({ apiKey: token })
    .then(game => done(null, game))
    .catch(err => done(err))
})
