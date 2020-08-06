import { EntityRepository, Repository, getRepository } from 'typeorm'
import { User } from '../entity/User'
import { Profile as GoogleProfile } from 'passport-google-oauth'
import { Profile as GithubProfile } from 'passport-github2'
import {
  SocialProvider,
  SOCIAL_PROVIDER_TYPE
} from './../entity/SocialProvider'
import e from 'express'

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  upsertGoogleUser(
    accessToken: string,
    refreshToken: string,
    profile: GoogleProfile
  ): Promise<User> {
    return new Promise((resolve, reject) => {
      return getRepository(SocialProvider)
        .findOneOrFail({
          relations: ['user'],
          where: {
            id: profile.id,
            provider: SOCIAL_PROVIDER_TYPE.GOOGLE
          }
        })
        .then(socialProvider => {
          return resolve(socialProvider.user)
        })
        .catch(async error => {
          var user = await this.findOneOrCreate({
            email: profile.emails![0].value,
            displayName: profile.displayName
          })
          var newProvider = new SocialProvider()
          newProvider.providerId = profile.id
          newProvider.accessKey = accessToken
          newProvider.provider = SOCIAL_PROVIDER_TYPE.GOOGLE
          user.providers.push(newProvider)

          return this.save(user)
            .then(user => resolve(user))
            .catch(error => reject(error))
        })
    })
  }

  async findOneOrCreate(userData: {
    email: string
    displayName: string
  }): Promise<User> {
    let user = await this.findOne({
      where: { email: userData.email }
    })
    if (!user) {
      user = new User()
      user.displayName = userData.displayName
      user.email = userData.email
    }
    return user
  }

  upsertGithubUser(
    accessToken: string,
    refreshToken: string,
    profile: GithubProfile
  ): Promise<User> {
    return new Promise((resolve, reject) => {
      return getRepository(SocialProvider)
        .findOneOrFail({
          relations: ['user'],
          where: {
            id: profile.id,
            provider: SOCIAL_PROVIDER_TYPE.GITHUB
          }
        })
        .then(socialProvider => {
          return resolve(socialProvider.user)
        })
        .catch(async error => {
          var user = await this.findOneOrCreate({
            email: profile.emails![0].value,
            displayName: profile.displayName
          })
          var newProvider = new SocialProvider()
          newProvider.providerId = profile.id
          newProvider.accessKey = accessToken
          newProvider.provider = SOCIAL_PROVIDER_TYPE.GITHUB
          user.providers = [newProvider]

          return this.save(user)
            .then(user => resolve(user))
            .catch(error => reject(error))
        })
    })
  }
}
