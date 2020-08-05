import {
  Entity,
  Column,
  Unique,
  ManyToOne
} from 'typeorm'
import { User } from './User';

export enum SOCIAL_PROVIDER_TYPE {
  GOOGLE = "GOOGLE",
  GITHUB = "GITHUB"
}

@Entity()
@Unique(['accessKey', 'provider'])
export class SocialProvider {

  @Column({nullable: false})
  id: string

  @Column({ nullable: false })
  accessKey: string

  @Column({type: "enum", enum:SOCIAL_PROVIDER_TYPE})
  provider: SOCIAL_PROVIDER_TYPE

  @ManyToOne(type => User, user => user.providers, {
    onDelete: 'CASCADE'
  })
  user: User
}
