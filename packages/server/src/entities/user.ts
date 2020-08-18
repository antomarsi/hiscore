import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  BaseEntity
} from 'typeorm'
import { Game } from './game'
import { SocialProvider, SOCIAL_PROVIDER_TYPE } from './social_provider'
import { Field, ID, ObjectType } from 'type-graphql'
import { OAuthProfile } from 'src/services/oauth'

@Entity({ name: 'users'})
@ObjectType()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number

  @Column()
  @Field()
  displayName!: string

  @Column()
  @Field()
  email!: string

  @Column({select: false})
  @CreateDateColumn()
  createdAt!: Date

  @Column({select: false})
  @UpdateDateColumn()
  updatedAt!: Date

  @OneToMany(() => Game, game => game.user)
  games!: Game[]

  @OneToMany(() => SocialProvider, provider => provider.user)
  providers!: SocialProvider[]

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

  static async upsertUser(profile: OAuthProfile, providerType: SOCIAL_PROVIDER_TYPE) : Promise<User> {
      const socialProvider = await SocialProvider.findOne({
          relations: ['user'],
          where: {
            id: profile.id,
            provider: providerType
          }
        });
      if (socialProvider) {
        return socialProvider.user;
      }
      const user = await this.findOneOrCreate({
        email: profile.email, displayName: profile.displayName
      })
      const provider = SocialProvider.create({
        providerId: profile.id,
            provider: providerType
      })
      if (user.providers === undefined) {
        user.providers = []
      }
      user.providers.push(provider)
      return await user.save()
    }
}
