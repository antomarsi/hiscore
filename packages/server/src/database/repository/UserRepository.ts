import { EntityRepository, Repository, getRepository } from 'typeorm'
import { User } from '../entity/User'
import {
  SocialProvider,
  SOCIAL_PROVIDER_TYPE
} from './../entity/SocialProvider'
import e from 'express'
import { OAuthProfile } from './../../config/oauth'

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  upsertUser(
    accessToken: string,
    profile: OAuthProfile,
    provider: SOCIAL_PROVIDER_TYPE
  ): Promise<User> {
    return new Promise((resolve, reject) => {
      return getRepository(SocialProvider)
        .findOneOrFail({
          relations: ['user'],
          where: {
            id: profile.id,
            provider: provider
          }
        })
        .then(socialProvider => {
          return resolve(socialProvider.user)
        })
        .catch(async error => {
          var user = await this.findOneOrCreate({
            email: profile.email,
            displayName: profile.displayName
          })
          var newProvider = new SocialProvider()
          newProvider.providerId = profile.id
          newProvider.accessKey = accessToken
          newProvider.provider = provider
          if (!user.providers) {
            user.providers = []
          }
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
}
