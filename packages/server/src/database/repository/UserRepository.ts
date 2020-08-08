import { EntityRepository, Repository, getRepository } from 'typeorm'

import { User, SocialProvider } from '../entity'
import { SOCIAL_PROVIDER_TYPE } from '../entity/SocialProvider'
import { OAuthProfile } from '../../config/oauth'
import { Provider } from 'react-redux'

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
          var newProvider = getRepository(SocialProvider).create({
            providerId: profile.id,
            accessKey: accessToken,
            provider: provider
          })
          if (user.providers === undefined) {
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
      user = this.create(userData)
    }
    return user
  }
}
