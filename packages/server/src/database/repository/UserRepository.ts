import { EntityRepository, Repository, getRepository } from 'typeorm'
import { User } from '../entity/User'
import { Profile as GoogleProfile } from 'passport-google-oauth'
import { Profile as GithubProfile } from 'passport-github'
import {
  SocialProvider,
  SOCIAL_PROVIDER_TYPE
} from './../entity/SocialProvider'

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
        .catch(error => {
          var newUser = new User()
          newUser.displayName = profile.displayName
          newUser.email = profile.emails![0].value
          var newProvider = new SocialProvider()
          newProvider.providerId = profile.id
          newProvider.accessKey = accessToken
          newProvider.provider = SOCIAL_PROVIDER_TYPE.GOOGLE
          newUser.providers.push(newProvider)

          return this.save(newUser)
            .then(user => resolve(user))
            .catch(error => reject(error))
        })
    })
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
        .catch(error => {
          var newUser = new User()
          newUser.displayName = profile.displayName
          newUser.email = profile.emails![0].value
          var newProvider = new SocialProvider()
          newProvider.providerId = profile.id
          newProvider.accessKey = accessToken
          newProvider.provider = SOCIAL_PROVIDER_TYPE.GITHUB
          newUser.providers.push(newProvider)

          return this.save(newUser)
            .then(user => resolve(user))
            .catch(error => reject(error))
        })
    })
  }
}
