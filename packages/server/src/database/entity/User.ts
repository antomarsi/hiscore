import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  BaseEntity
} from 'typeorm'
import { Game } from './Game'
import { Exclude } from 'class-transformer'
import { SocialProvider, SOCIAL_PROVIDER_TYPE } from './SocialProvider'
import { OAuthProfile } from './../../config/oauth'

@Entity()
export class User extends BaseEntity {
  @Exclude()
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  displayName: string

  @Column()
  email: string

  @Exclude()
  @Column({ select: false })
  @CreateDateColumn()
  createdAt: Date

  @Exclude()
  @Column({ select: false })
  @UpdateDateColumn()
  updatedAt: Date

  @Exclude()
  @OneToMany(type => Game, game => game.user)
  games: Game[]

  @Exclude()
  @OneToMany(type => SocialProvider, provider => provider.user)
  providers: SocialProvider[]

  static async findOneOrCreate(userData: {
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

  static upsertUser(
    profile: OAuthProfile,
    provider: SOCIAL_PROVIDER_TYPE
  ): Promise<User> {
    return new Promise((resolve, reject) => {
      return SocialProvider.findOneOrFail({
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
          var newProvider = SocialProvider.create({
            providerId: profile.id,
            provider: provider
          })
          if (user.providers === undefined) {
            user.providers = []
          }
          user.providers.push(newProvider)

          return user
            .save()
            .then(user => resolve(user))
            .catch(error => reject(error))
        })
    })
  }
}
